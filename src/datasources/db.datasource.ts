import { inject, lifeCycleObserver, LifeCycleObserver } from "@loopback/core";
import { juggler } from "@loopback/repository";

import { config } from "@core/config.core";

const dbConfig = {
  name: "db",
  connector: "postgresql",
  url: "",
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  min: 5,
  max: 200,
  idleTimeoutMillis: 60000,
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = "db";
  static readonly defaultConfig = config;

  constructor(
    @inject("datasources.config.db", { optional: true })
    dsConfig: object = dbConfig,
  ) {
    super(dsConfig);
  }
}
