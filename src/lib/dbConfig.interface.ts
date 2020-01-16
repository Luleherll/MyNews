interface DB {
  dialect: "postgres" | "mysql" | "sqlite" | "mariadb" | "mssql" | undefined
  database: string | undefined
  password: string | undefined
  username: string | undefined
}

export { DB }