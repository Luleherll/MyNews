import sendGrid from "@sendgrid/mail";
import { SENDGRID_API_KEY } from '../../config';

class Mailer {

  constructor() {
    sendGrid.setApiKey(SENDGRID_API_KEY)
  }

  send = (email) => sendGrid
  .send(email)
  .then(() => 'Link sent successfully, please check your email.')
  // .catch(err => err);
}

export default new Mailer();