import { signUp } from "../lib/validation";
import Queries from "../lib/queries";
import DB from "../models";
import { JwtUtil } from "../utils";
import { ERRORS, ROUTES } from "../lib/constants";

const dataValidator = (req: any, res: any, next: any) => {
  const { user } = req.body;
  let message;
  if (!user) {
    message = ERRORS.MISSING_USER_OBJECT;
  } else {
    const { error } = signUp.validate(user);

    if (error) {
      const {
        details: [first]
      } = error;
      message = first.message.replace('"', "").replace('"', "");
    }
  }

  return (message && next({error: message, status: 400})) || next();
};

const tokenDecoder = (req: any, res: any, next: any) => {
  const verifyEmail: boolean = req.url.includes(ROUTES.VERIFY_EMAIL)
  let token: string = verifyEmail ? req.query.code : req.headers.authorization;
  token = token.split(' ')[1]
  const subject = JwtUtil.decodeToken(token);
  if (subject.error) {
    if (subject.error !== 'jwt expired') {
      return next(subject.error)
    }
    return next(ERRORS.EXPIRED_JWT)
  }

  req.body['user'] = { email: subject.value };
  next()
}

const userValidator = async (req: any, res: any, next: any) => {
  const {
    user: { email }
  } = req.body;
  const signup: boolean = req.url.includes(ROUTES.SIGNUP);
  const exists = await Queries.findData(DB.User, { email });

  if (exists) {
    if (signup) {
      return next(ERRORS.USER_EXISTS);
    }
    req.body.user = exists
    return next()
  }
  return !exists && signup ? next() : next(ERRORS.USER_NOT_REGISTERED);
};

export { dataValidator, userValidator, tokenDecoder };
