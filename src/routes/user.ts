import promiseRouter from 'express-promise-router';
import { user } from '../controllers';
import { dataValidator, userValidator } from '../middleware';

export default (router: any) => {
  router.route('/signup').post(dataValidator, userValidator, user.signUp)

  return router;
}
