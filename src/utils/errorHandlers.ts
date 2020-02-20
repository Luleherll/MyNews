import { IError } from "../lib";

const checkDbConnection = (connection) => connection
.authenticate()
.then(() => {
  console.log('DB connection sucessful.');
  return null;
})
.catch(err => err);

const createErrorObject = (error, status): IError =>  ({ error, status })

export { checkDbConnection, createErrorObject }
