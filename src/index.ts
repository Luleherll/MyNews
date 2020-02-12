import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { dbConnection, handleErrors, checkEnvVariables } from './middleware';
import routes from './routes'
import { PORT, Logger, logEnv } from './config'

const app = express();

// middleware
app.use(
  morgan("combined", {
    stream: { write: log => Logger[logEnv](log) }
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(dbConnection)
app.use(checkEnvVariables)

// routes
app.use('/api/v1', routes);
app.use(handleErrors)

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;
