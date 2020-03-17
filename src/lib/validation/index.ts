import { signUp, signIn, passwordReset, profileUpdate } from './auth';
import { newsPost } from './news';
import { ROUTES } from '../constants';

const userFields = ['username', 'email', 'password', 'photo'];
const newsFields = ['title', 'description', 'content', 'source']

const validationMap = new Map([
  [ROUTES.SIGNUP, signUp], [ROUTES.LOGIN, signIn], [ROUTES.PASSWORD_RESET, passwordReset],
  [ROUTES.NEWS, newsPost], [ROUTES.PROFILE_UPDATE, profileUpdate]
]);

export { signUp, signIn, passwordReset, userFields, newsFields, validationMap };
