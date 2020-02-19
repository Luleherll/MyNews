import { signUp } from "../lib/validation";
import Queries from "../lib/queries";
import DB from "../models";
import { JwtUtil } from "../utils";

const dataValidator = (req: any, res: any, next: any) => {
  const { user } = req.body;
  let message;
  if (!user) {
    message = "User is required.";
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
  const endpoint = req.url.slice(1, 13);
  let token = endpoint === 'verify-email' ? req.query.code : req.headers.authorization;
  token = token.split(' ')[1]
  const subject = JwtUtil.decodeToken(token);
  if (subject.error) {
    if (subject.error !== 'jwt expired') {
      return next(subject.error)
    }
    return next({ error: 'Link has expired.', status: 400 })
  }

  req.body['user'] = { email: subject.value };
  next()
}

const userValidator = async (req: any, res: any, next: any) => {
  const {
    user: { email }
  } = req.body;
  const endpoint = req.url.slice(1);
  const exists = await Queries.findData(DB.User, { email });

  if (exists) {
    if (endpoint === "signup") {
      return next({error: "User already exists.", status: 400});
    }
    req.body.user = exists
    return next()
  }
  return !exists && endpoint === "signup" ? next() : next({ error: 'User is not registered.', status: 400 });
};

export { dataValidator, userValidator, tokenDecoder };
