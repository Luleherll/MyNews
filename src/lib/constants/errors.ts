import { errorHandlers } from "../../utils";

const MISSING_USER_OBJECT = 'User is required.'
const EXPIRED_JWT = errorHandlers.createErrorObject('Link has expired.', 401)
const USER_EXISTS = errorHandlers.createErrorObject('User already exists.', 400);
const USER_NOT_REGISTERED = errorHandlers.createErrorObject('User is not registered.', 400);
const INVALID_CREDENTIALS = errorHandlers.createErrorObject('Invalid email or password', 401);

export { MISSING_USER_OBJECT, EXPIRED_JWT, USER_EXISTS, USER_NOT_REGISTERED, INVALID_CREDENTIALS }