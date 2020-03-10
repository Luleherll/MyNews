import { signUp, signIn, passwordReset } from './auth';
import { newsPost } from './news';
import { ROUTES } from '../constants';

const userFields = ['username', 'email', 'password', 'photo'];

const validationMap = new Map([
  [ROUTES.SIGNUP, signUp], [ROUTES.LOGIN, signIn], [ROUTES.PASSWORD_RESET, passwordReset],
  [ROUTES.NEWS, newsPost]
]);

export { signUp, signIn, passwordReset, userFields, validationMap };
