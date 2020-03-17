interface DB {
  dialect: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql" | undefined
  database: string | undefined
  password: string | undefined
  username: string | undefined
  useEnvVariable?: string
}

interface IEmailTemplate {
  subject: string
  text: string
  template: (token?: string) => string
}

interface IError {
  error: string;
  status: number;
}

interface INewsFilter {
  columns?: object;
  term?: string;
}

export { DB, IEmailTemplate, IError, INewsFilter }