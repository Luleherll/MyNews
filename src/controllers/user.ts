import { JwtUtil } from '../utils';
import Queries from '../lib/queries'
import { userFields } from '../lib/validation';
import Emitter from '../lib/events';
import { SEND_EMAIL } from '../lib/events/constants';
import { emailVerification } from '../utils/mailer/templates';

export default class UserController {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  signUp = async(req: any, res: any, next: any) => {
    const { user } = req.body;

    let newUser = await Queries.addData(this.model, user, userFields);
    Emitter.emit(SEND_EMAIL, emailVerification(newUser), res, next)
  }
}