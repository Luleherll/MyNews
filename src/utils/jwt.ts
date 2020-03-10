import * as JWT from "jsonwebtoken";
import { JWT_ISSUER, JWT_SECRET, ONE_HOUR } from "../config";

export default class JwtUtil {
  private static signToken = (sub: string, exp?) => {
    const expiresIn = exp || null;
    return JWT.sign(
      {
        iss: JWT_ISSUER,
        sub,
        iat: new Date().getTime(),
        expiresIn
      },
      JWT_SECRET
    );
  };

  static getAuthToken = (user) => {
    user.accessToken = JwtUtil.signToken(user.user, ONE_HOUR)
    return user
  };

  static getVerificationToken = (user) => {
    user.token = JwtUtil.signToken(user.user, ONE_HOUR)
    return user
  } 

  static getRefreshToken = (user) => {
    user.refreshToken = JwtUtil.signToken(user.user);
    return user
  } 

  static decodeToken = (token: string) => {
    let subject = { error: null, value: null};
    try {
      subject.value = JWT.verify(token, JWT_SECRET).sub;
    } catch (e) {
      subject.error = e.message === 'jwt expired' ? e.message : {message: e.message, token};
      return subject;
    }
    return subject;
  };
}
