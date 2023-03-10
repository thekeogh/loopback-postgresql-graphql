import fs from "fs";

import chalk from "chalk";

import { ApplicationConfig, Application } from "@src/application";

import { config } from "@core/config.core";
import { log } from "@core/util.core";

export * from "@src/application";

const protocol = config.environment.https ? "https" : "http";
const host = config.environment.host;
const port = config.environment.port;
const url = `${protocol}://${host}${port && `:${port}`}`;

export async function main(options: ApplicationConfig = {}) {
  const app = new Application(options);
  await app.boot();
  await app.start();

  log(chalk.green(`  ${chalk.bgGreen.hex("#000000").bold(" ✓ ")} Environment: ${chalk.yellow.bold(config.environment.env)}`));
  log(chalk.green(`  ${chalk.bgGreen.hex("#000000").bold(" ✓ ")} URL: ${chalk.yellow.bold(url)}`));
  log(chalk.white.dim("  Press CTRL-C to stop server\n"));

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
