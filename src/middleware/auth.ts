import Queries from "../lib/queries";
import DB from "../models";
import { JwtUtil } from "../utils";
import { ERRORS, ROUTES } from "../lib/constants";
import { Logger } from "../config";

// Password reset helper
const addPassword = (req, path, password) => {
  if (path === ROUTES.PASSWORD_RESET) {
    req.body.password = password
  }
}

const tokenDecoder = (req: any, res: any, next: any) => {
  const { path } = req.route;
  const emailBacklinks = { [ROUTES.VERIFY_EMAIL]: 1, [ROUTES.PASSWORD_RESET]: 1 };
  let token: string = emailBacklinks[path] ? req.query.code : req.headers.authorization;
  if (!token) { return next(ERRORS.UNAUTHORIZED); }
  token = token.split(" ")[1];
  const { error, value } = JwtUtil.decodeToken(token);

  if (error) {
    Logger.info({message: error, token})
    return emailBacklinks[path] ? next(ERRORS.EXPIRED_LINK) : next(ERRORS.UNAUTHORIZED);
  }

  req.user = value;
  next();
};

const userValidator = async (req: any, res: any, next: any) => {
  const { email, password } = req.user || req.body;
  const { path } = req.route;
  let isPath;
  const exists = await Queries.findOne(DB.User, { email });
  const paths = {
    [ROUTES.SIGNUP]: { check: path === ROUTES.SIGNUP, error: ERRORS.USER_EXISTS },
    [ROUTES.LOGIN]: { check: path === ROUTES.LOGIN && exists && !exists.validatePassword(password), error: ERRORS.INVALID_CREDENTIALS }
  };

  addPassword(req, path, password)

  if (exists) {
    isPath = paths[path];
    if (isPath && isPath.check) {
      return next(isPath.error);
    }
    req.user = exists;
    return next();
  }
  return !exists && path === ROUTES.SIGNUP ? next() : next(ERRORS.USER_NOT_REGISTERED);
};

export { userValidator, tokenDecoder };
