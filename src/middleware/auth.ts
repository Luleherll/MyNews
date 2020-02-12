import { signUp } from "../lib/validation";
import Queries from "../lib/queries";
import DB from "../models";

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

const userValidator = async (req: any, res: any, next: any) => {
  const {
    user: { email }
  } = req.body;
  const endpoint = req.url.slice(1);
  const exists = await Queries.findData(DB.User, { email });

  if (exists && endpoint === "signup") {
    return next({error: "User already exists.", status: 400});
  }

  next();
};

export { dataValidator, userValidator };
