declare namespace NodeJS {

  /**
   * Environmental variables
   * 
   * Ensure you add any additional .env variables here.
   * TypeScript will automatically pick them up on the process.env.
   */
  interface ProcessEnv {
    // Environment
    NODE_ENV: "development" | "edge" | "staging" | "production" | "test";
    HOST: string;
    PORT: number;
    HTTPS: string;
    SSL_CERT_FILE: string;
    SSL_KEY_FILE: string;
    // Database
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
  }

}