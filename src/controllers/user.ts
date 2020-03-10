import { Response, Hash } from "../utils";
import Queries from "../lib/queries";
import { userFields } from "../lib/validation";
import Emitter from "../lib/events";
import { EVENTS } from "../lib/constants";
import { emailVerification, resetPasswordEmail } from "../utils/mailer/templates";
import { INVALID_REFRESH_TOKEN } from "../lib/constants/errors";

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
    let user = req.user;

    user.verified = true;
    user = await user.save();
    const { refreshToken } = Emitter.emitValue(EVENTS.GET_REFRESH_TOKEN, {user: { id: user.id }});
    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});
  
    return Response.success(res, { accessToken, refreshToken}, 201);
  };

  signIn = async (req: any, res: any, next: any) => {
    let user = req.user;
    if (!user.verified) return Emitter.emit(EVENTS.SEND_EMAIL, emailVerification(user), res, next);

    const { refreshToken } = Emitter.emitValue(EVENTS.GET_REFRESH_TOKEN, {user: { id: user.id }});
    await user.createRefreshToken({ value: refreshToken });
    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});

    return Response.success(res, { accessToken, refreshToken}, 200);
  };

  refreshToken = async(req, res, next) => {
    const { user: { id }, headers: { authorization } } = req;

    let user = await Queries.findData(this.model, { id })
    let token = await user.getRefreshTokens()
    token = token.find( token => token.value === authorization.split(' ')[1])
    if (!token) { return Response.failure(res, INVALID_REFRESH_TOKEN , 401) }

    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});

    return Response.success(res, { accessToken }, 200);
  }

  passwordResetRequest = async(req, res, next) => {
    let { user, body: { password } } = req;
    return Emitter.emit(EVENTS.SEND_EMAIL, resetPasswordEmail({ email: user.email, password}), res, next);
  }

  passwordResetHandler = async(req, res, next) => {
    let { user, body: { password } } = req;
    password = Hash.makeHash(password); 
    user.password = password;
    user = await user.save();
    user = user.filtered();
    const { accessToken } = Emitter.emitValue(EVENTS.GET_AUTH_TOKEN, {user});

    return Response.success(res, { accessToken }, 200);
  }
}
