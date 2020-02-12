const checkDbConnection = (connection) => connection
.authenticate()
.then(() => {
  console.log('DB connection sucessful.');
  return null;
})
.catch(err => err);

export { checkDbConnection }
