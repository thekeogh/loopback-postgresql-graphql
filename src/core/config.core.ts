export const config = {
  /**
   * Environment
   */
  environment: {
    env: process.env.NODE_ENV || "production",
    host: process.env.HOST || "localhost",
    port: process.env.PORT || 3000,
    https: process.env.HTTPS === "true",
    sslCertFile: process.env.SSL_CERT_FILE,
    sslKeyFile: process.env.SSL_KEY_FILE,
  },

  /**
   * Database
   */
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};