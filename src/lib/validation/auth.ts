import JOI from '@hapi/joi';

const userDTO = {
  username: JOI.string().alphanum().max(20).required(),
  email: JOI.string().email().required(),
  password: JOI.string().pattern(new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/)).required(),
  photo: JOI.string().uri()
};

const signUp = JOI.object(userDTO)

export { signUp }
