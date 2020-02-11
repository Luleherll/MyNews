import { Auth } from "../lib/validation";
import Queries from "../lib/queries";
import DB from "../models";

const dataValidator = (req: any, res: any, next: any) => {
  const { user } = req.body;
  const map = { signup: Auth.all };
  const endpoint = req.url.slice(1);
  let response = null;

  if (user) {
    const errors = map[endpoint](user);
    response = errors && res.status(400).json({ errors });
  } else {
    response = res.status(400).json({ errors: { required: ["user"] } });
  }

  return response || next();
};

const userValidator = async (req: any, res: any, next: any) => {
  const {
    user: { email }
  } = req.body;
  const endpoint = req.url.slice(1);
  const exists = await Queries.findData(DB.User, { email });

  if (exists && endpoint === "signup") {
    return res.status(400).json({ errors: { user: "User already exists." } });
  }

  next();
};

export { dataValidator, userValidator };
