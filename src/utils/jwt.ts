import * as JWT from "jsonwebtoken";
import { JWT_ISSUER, JWT_SECRET, ONE_HOUR } from "../config";

export default class JwtUtil {
  private static signToken = (sub: string, exp?) => {
    const expiresIn = exp || new Date().setDate(new Date().getDate() + 1);
    return JWT.sign(
      {
        iss: JWT_ISSUER,
        sub,
        iat: new Date().getTime(),
        exp: expiresIn
      },
      JWT_SECRET
    );
  };

  static getAuthToken = (userId) => JwtUtil.signToken(userId);

  static getVerificationToken = (email) => JwtUtil.signToken(email, ONE_HOUR)

  static decodeToken = (token: string) => {
    let subject = { error: null, value: null};
    try {
      console.log(JWT.verify(token, JWT_SECRET).sub);
      subject.value = JWT.verify(token, JWT_SECRET).sub;
    } catch (e) {
      subject.error = e.message === 'jwt expired' ? e.message : {message: e.message, token};
      return subject;
    }
    return subject;
  };
}
