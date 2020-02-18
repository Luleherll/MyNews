import * as JWT from "jsonwebtoken";
import { JWT_ISSUER, JWT_SECRET } from "../config";

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
}
