import { signUp, signIn, passwordReset } from "../lib/validation";
import Queries from "../lib/queries";
import DB from "../models";
import { JwtUtil } from "../utils";
import { ERRORS, ROUTES } from "../lib/constants";

const dataValidator = (req: any, res: any, next: any) => {
  const {
    body: user,
    route: { path }
  } = req;
  const map = { [ROUTES.SIGNUP]: signUp, [ROUTES.LOGIN]: signIn, [ROUTES.PASSWORD_RESET]: passwordReset };
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
  const emailBacklinks = { [ROUTES.VERIFY_EMAIL]: 1, [ROUTES.PASSWORD_RESET]: 1 };
  let token: string = emailBacklinks[path] ? req.query.code : req.headers.authorization;
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
    body: { email, password },
    route: { path }
  } = req;
  let isPath;
  const exists = await Queries.findData(DB.User, { email });
  const paths = {
    [ROUTES.SIGNUP]: { check: path === ROUTES.SIGNUP, error: ERRORS.USER_EXISTS },
    [ROUTES.LOGIN]: { check: path === ROUTES.LOGIN && !exists.validatePassword(password), error: ERRORS.INVALID_CREDENTIALS }
  };

  if (exists) {
    isPath = paths[path];
    if (isPath && isPath.check) {
      return next(isPath.error);
    }
    req.body.user = exists;
    return next();
  }
  return !exists && path === ROUTES.SIGNUP ? next() : next(ERRORS.USER_NOT_REGISTERED);
};

export { dataValidator, userValidator, tokenDecoder };
