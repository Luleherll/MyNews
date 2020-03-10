import { userValidator, tokenDecoder } from './auth';
import { errorHandlers, Response } from '../utils';
import { connection } from '../models';
import { IError } from '../lib';
import * as env from '../config';
import { validationMap } from '../lib/validation';

const dbConnection = async(req: any, res: any, next: any) => {
  const error = await errorHandlers.checkDbConnection(connection);
  if (error) {
    return next(error)
  }
  next()
}

const checkEnvVariables = (req: any, res: any, next: any) => {
  const missing = [];
  for (const variable in env) {
    if (env.hasOwnProperty(variable) && !env[variable]) {
      missing.push(variable)
    }
  }
  
  if (missing.length) {
    return next({ message: 'Missing environmental variables', list: missing })
  } else { next() }
  
}

const handleErrors = (err: IError, req: any, res: any, next: any) => {
  console.log(err);
  if (err.error) {
    return Response.failure(res, err.error, err.status)
  } else {
    env.Logger.error(err)
  }
  return Response.failure(res);
}

const dataValidator = (req: any, res: any, next: any) => {
  const {
    body: data,
    route: { path }
  } = req;
  let message;
  const { error } = validationMap.get(path).validate(data);

  if (error) {
    const {
      details: [first]
    } = error;
    message = first.message.replace('"', "").replace('"', "");
  }

  return (message && next({ error: message, status: 400 })) || next();
};

export { dataValidator, userValidator, tokenDecoder, dbConnection, handleErrors, checkEnvVariables }
