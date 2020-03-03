import { signUp, signIn } from "../lib/validation";
import Queries from "../lib/queries";
import DB from "../models";
import { JwtUtil } from "../utils";
import { ERRORS, ROUTES } from "../lib/constants";

const dataValidator = (req: any, res: any, next: any) => {
  const {
    body: user,
    route: { path }
  } = req;
  const map = { [ROUTES.SIGNUP]: signUp, [ROUTES.LOGIN]: signIn };
  let message;
  if (!user) {
    message = ERRORS.MISSING_USER_OBJECT;
  } else {
    const { error } = map[path].validate(user);

    if (error) {
      const {
        details: [first]
      } = error;
      message = first.message.replace('"', "").replace('"', "");
    }
  }

  return (message && next({ error: message, status: 400 })) || next();
};

const tokenDecoder = (req: any, res: any, next: any) => {
  const { path } = req.route;
  let token: string = path === ROUTES.VERIFY_EMAIL ? req.query.code : req.headers.authorization;
  token = token.split(" ")[1];
  const subject = JwtUtil.decodeToken(token);
  if (subject.error) {
    if (subject.error !== "jwt expired") {
      return next(subject.error);
    }
    return next(ERRORS.EXPIRED_JWT);
  }

  req.body = subject.value;
  next();
};

const userValidator = async (req: any, res: any, next: any) => {
  const {
    body: {
      email,
      password
    },
    route: { path }
  } = req;
  const signup: boolean = path === ROUTES.SIGNUP;
  const login: boolean = path === ROUTES.LOGIN;
  const exists = await Queries.findData(DB.User, { email });

  if (exists) {
    if (signup) {
      return next(ERRORS.USER_EXISTS);
    }
    if (login && !exists.validatePassword(password)) {
      return next(ERRORS.INVALID_CREDENTIALS);
    }
    req.body = exists;
    return next();
  }
  return !exists && signup ? next() : next(ERRORS.USER_NOT_REGISTERED);
};

export { dataValidator, userValidator, tokenDecoder };
