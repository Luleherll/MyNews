import bcrypt from 'bcryptjs';

const makeHash = (value) => bcrypt.hashSync(value, 8);
const compareHash = (value, hash) => bcrypt.compareSync(value, hash)

export { makeHash, compareHash }
