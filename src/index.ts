import fs from "fs";

import chalk from "chalk";
import { createHandler } from "graphql-http/lib/use/express";
import { Oas3, createGraphQLSchema } from "openapi-to-graphql";

import { ApplicationConfig, Application } from "@src/application";

import { config } from "@core/config.core";
import { log } from "@core/util.core";

export * from "@src/application";

if (config.environment.sslCertSkipVerification && config.environment.env === "development") {
  // Disable SSL certification verification (only allowed in development)
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}
const protocol = config.environment.https ? "https" : "http";
const host = config.environment.host;
const port = config.environment.port;
const url = `${protocol}://${host}${port && `:${port}`}`;

export async function main(options: ApplicationConfig = {}) {
  // Initialise the RESTful app
  const app = new Application(options);
  await app.boot();
  await app.start();
  // Initialise the GraphQL app
  const gqlPath = "/graphql";
  const spec = await app.restServer.getApiSpec() as Oas3;
  const { schema }  = await createGraphQLSchema(spec, {
    strict: false, 
    viewer: true,
    baseUrl: url,
  });
  app.mountExpressRouter(gqlPath, createHandler({ schema }) );
  // Log the status to the console
  log(chalk.green(`  ${chalk.bgGreen.hex("#000000").bold(" ✓ ")} Environment: ${chalk.yellow.bold(config.environment.env)}`));
  log(chalk.green(`  ${chalk.bgGreen.hex("#000000").bold(" ✓ ")} URL: ${chalk.yellow.bold(url)}`));
  log(chalk.white.dim("  Press CTRL-C to stop server\n"));
  // Return the app
  return app;
}

if (require.main === module) {
  // Run the application
  const setup: ApplicationConfig = {
    rest: {
      expressSettings: {
        "x-powered-by": false,
        "trust proxy": true,
      },
      requestBodyParser: {
        json: {
          limit: "200mb",
        },
      },
      protocol,
      key: config.environment.sslKeyFile && fs.readFileSync(process.cwd() + config.environment.sslKeyFile),
      cert: config.environment.sslCertFile && fs.readFileSync(process.cwd() + config.environment.sslCertFile),
      port,
      host,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(setup).catch(err => {
    console.error("Cannot start the application.", err);
    process.exit(1);
  });
}
