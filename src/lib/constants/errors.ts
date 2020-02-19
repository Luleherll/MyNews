import { errorHandlers } from "../../utils";

const MISSING_USER_OBJECT = 'User is required.'
const EXPIRED_JWT = errorHandlers.createErrorObject('Link has expired.', 400)
const USER_EXISTS = errorHandlers.createErrorObject('User already exists.', 400);
const USER_NOT_REGISTERED = errorHandlers.createErrorObject('User is not registered.', 400);

export { MISSING_USER_OBJECT, EXPIRED_JWT, USER_EXISTS, USER_NOT_REGISTERED }