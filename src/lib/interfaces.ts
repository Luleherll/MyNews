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
  template: string
}

interface IError {
  error: string;
  status: number;
}

export { DB, IEmailTemplate, IError }