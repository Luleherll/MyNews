export default class AuthValidation {
  private static authSchema = {
    username: { regExp: /^([a-zA-Z0-9_-]+)$/, error: "Username should only be alphanumeric and underscores" },
    email: {
      regExp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error: "Email is invalid."
    },
    password: { regExp: /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,}$/, error: "Password should be a minimum of 8 characters." }
  };

  private static validate = (data, dto) => {
    let errors = { required: [] };
    for (const key in dto) {
      if (!Object.keys(data).includes(key)) {
        errors.required.push(key);
        continue
      }

      const match = dto[key];
      if (!match.regExp.test(data[key])) {
        errors[key] = match.error;
      }
    }
    errors = Object.keys(errors).length === 1 && !errors.required.length ? null : errors;
    return  errors;
  };

  static all = (data) => AuthValidation.validate(data, AuthValidation.authSchema);
  
}
