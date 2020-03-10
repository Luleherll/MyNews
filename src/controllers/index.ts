import DB from '../models';
import UserController from './user';
import NewsController from './news';

const db = DB;

const user = new UserController(db.User)
const news = new NewsController(db.News)

export { user, news }