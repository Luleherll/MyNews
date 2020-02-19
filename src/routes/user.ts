import promiseRouter from 'express-promise-router';
import { user } from '../controllers';
import { dataValidator, userValidator, tokenDecoder } from '../middleware';

export default (router: any) => {
  router.route('/signup').post(dataValidator, userValidator, user.signUp)
  router.route('/verify-email').get(tokenDecoder, userValidator, user.verifyEmail)

  return router;
}
