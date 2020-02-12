import { AUTH_EMAIL } from '../../../config';
import { IEmailTemplate } from '../../../lib';
import verification from './emailVerification';

const layout = (template: IEmailTemplate) => (user: any): object => ({
  to: user.email,
  from: AUTH_EMAIL,
  subject: template.subject,
  text: template.text,
  html: `
  <div style="background-color: #c7c7c7;height: 100%;display: flex;flex-direction: row;justify-content: center;padding: 2% 10%;
  ">
  <div style="
  background-color: white;width: 88%;height: fit-content;padding: 0 2% 2% 2%;
  ">
    <h1 
  style="
  color: darkred;padding: 5px;text-align:center;
  ">MyNews</h1>
  <hr />
  
  <h2 style="font-weight: bolder;">Hello Herman,</h2>
  <div style="padding: 2%;">
    ${template.template}
  </div>
  <div>Thank you, The MyNews team</div>
  </div>
  </div>

`
})

const emailVerification = layout(verification);

export { emailVerification };
