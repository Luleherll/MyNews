import { JwtUtil, Response } from "../utils";
import Queries from "../lib/queries";
import { userFields } from "../lib/validation";
import Emitter from "../lib/events";
import { EVENTS } from "../lib/constants";
import { emailVerification, resetPasswordEmail } from "../utils/mailer/templates";
import User from "../models/user";

export default class UserController {
  model: any;
  constructor(model: any) {
    this.model = model;
  }

  signUp = async (req: any, res: any, next: any) => {
    const { body: user } = req;

    const newUser = await Queries.addData(this.model, user, userFields);
    Emitter.emit(EVENTS.SEND_EMAIL, emailVerification(newUser), res, next);
  };

  verifyEmail = async (req: any, res: any, next: any) => {
    let { user } = req.body;

    user = await Queries.update(user, { verified: true }).catch(err => next(err));
    const { refreshToken } = Emitter.emitValue(EVENTS.GET_REFRESH_TOKEN, {user: user.id});
    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});
  
    return Response.success(res, { accessToken, refreshToken}, 201);
  };

  signIn = async (req: any, res: any, next: any) => {
    let { user } = req.body;
    if (!user.verified) return Emitter.emit(EVENTS.SEND_EMAIL, emailVerification(user), res, next);

    const { refreshToken } = Emitter.emitValue(EVENTS.GET_REFRESH_TOKEN, {user: user.id});
    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});

    return Response.success(res, { accessToken, refreshToken}, 200);
  };

  refreshToken = async(req, res, next) => {
    const { body: id } = req;
    let user = await Queries.findData(this.model, { id })
    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});

    return Response.success(res, { accessToken }, 200);
  }

  passwordResetRequest = async(req, res, next) => {
    let { user, password } = req.body;
    return Emitter.emit(EVENTS.SEND_EMAIL, resetPasswordEmail({ email: user.email, password}), res, next);
  }
  passwordResetHandler = async(req, res, next) => {
    let { user, password } = req.body;
    user.password = password;
    user = await user.save()
    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});

    return Response.success(res, { accessToken }, 200);
  }
}
