import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';

import { main } from './routes'
import { PORT } from './config'
// import dbConnection from './models'

const app = express();

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Database connection
// dbConnection()

// routes
app.use('/api/v1', main);

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;
