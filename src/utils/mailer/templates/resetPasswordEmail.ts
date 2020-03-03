import { MAIL_RETURN_URL } from "../../../config";
import { JwtUtil } from '../..';
import { ROUTES } from "../../../lib/constants";

const reset = (user): string => {
  let {token} = JwtUtil.getVerificationToken({user})
  token = `Bearer ${token}`
  return `
You requested to reset your MyNews account.
<h4>
Please follow the link below to create a new password: <br />
<a style="text-decoration: none;" href="${MAIL_RETURN_URL}${ROUTES.PASSWORD_RESET}/?code=${token}">Reset Password</a>
</h4>
`;
} 

export default {
  subject: "MyNews password reset",
  text: "Reset password to access your account.",
  template: reset
};
