import promiseRouter from 'express-promise-router';
import User from './user'

const main = promiseRouter();
let routes: any;
routes = User(main);

routes.route('/').get((req, res) => res.status(200).json({ message: 'Server is up and running.' }));

export = routes;
