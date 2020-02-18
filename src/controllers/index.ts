import DB from '../models';
import UserController from './user';

const db = DB as any;

const user = new UserController(db.User)

export { user }