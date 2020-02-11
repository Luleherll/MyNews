import { JwtUtil } from '../utils';
import Queries from '../lib/queries'
import { userFields } from '../lib/validation';

export default class UserController {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  signUp = async(req: any, res: any) => {
    const { user } = req.body;

    let newUser = await Queries.addData(this.model, user, userFields);
    const accessToken = JwtUtil.getAuthToken(newUser.id);
    newUser = newUser.filtered();

    return res.status(201).json({accessToken, user: newUser})
  }
}