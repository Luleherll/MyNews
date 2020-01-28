import promiseRouter from 'express-promise-router';

const main = promiseRouter();

main.route('/').get((req, res) => res.status(200).json({ message: 'Server is up and running.' }));

export { main };
