import { news } from '../controllers';
import { dataValidator, userValidator, tokenDecoder} from '../middleware';
import { ROUTES } from '../lib/constants';

export default (router: any) => {
  router.route(ROUTES.NEWS).post(tokenDecoder, userValidator, dataValidator, news.createNews)
  router.route(ROUTES.NEWS).get(tokenDecoder, userValidator, news.getNews)

  return router;
}