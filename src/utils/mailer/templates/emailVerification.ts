import { MAIL_RETURN_URL } from "../../../config";
import { JwtUtil } from '../..';
import { ROUTES } from "../../../lib/constants";

const verification = (user): string => {
  let {token} = JwtUtil.getVerificationToken({user})
  token = `Bearer ${token}`
  return `
Thank you for registering an account on MyNews.
<h4>
Please verify your email by clicking the link below: <br />
<a style="text-decoration: none;" href="${MAIL_RETURN_URL}${ROUTES.VERIFY_EMAIL}/?code=${token}">Verify your Email</a>
</h4>
`;
} 

export default {
  subject: "MyNews email verification",
  text: "Verify your email to complete registration.",
  template: verification
};
