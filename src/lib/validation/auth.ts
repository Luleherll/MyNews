import JOI from '@hapi/joi';

const userDTO = {
  username: JOI.string().alphanum().max(20).required(),
  email: JOI.string().email().required(),
  password: JOI.string().pattern(new RegExp(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/)).required(),
  photo: JOI.string().uri()
};

const signUp = JOI.object(userDTO)
const signIn = JOI.object({ email: userDTO.email, password: userDTO.password })
const passwordReset = JOI.object({ email: userDTO.email, password: userDTO.password, confirmPassword: JOI.ref('password') }).with('password', 'confirmPassword');
const profileUpdate = JOI.object({
  username: JOI.string().alphanum().max(20),
  email: JOI.string().email(),
  photo: JOI.string().uri()
})

export { signUp, signIn, passwordReset, profileUpdate }
