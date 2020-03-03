import { user } from '../controllers';
import { dataValidator, userValidator, tokenDecoder } from '../middleware';
import { ROUTES } from '../lib/constants';

export default (router: any) => {
  router.route(ROUTES.SIGNUP).post(dataValidator, userValidator, user.signUp)
  router.route(ROUTES.VERIFY_EMAIL).get(tokenDecoder, userValidator, user.verifyEmail)
  router.route(ROUTES.LOGIN).post(dataValidator, userValidator, user.signIn)
  router.route(ROUTES.REFRESH_TOKEN).get(tokenDecoder, user.refreshToken)
  router.route(ROUTES.PASSWORD_RESET).post(dataValidator, userValidator, user.passwordResetRequest)
  router.route(ROUTES.PASSWORD_RESET).get(tokenDecoder, userValidator, user.passwordResetHandler)

  return router;
}
