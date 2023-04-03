# LoopBack 4 PostgreSQL GraphQL Boilerplate

A boilerplate/starter project for quickly building GraphQL APIs using Node.js, LoopBack 4 and PostgreSQL.

## Prerequisites

- Node (built with `19`, but should work on lower)
- PostgreSQL (locally, externally or docker)

## Setup

Clone the repository

```shell
git clone git@github.com:thekeogh/loopback-postgresql-graphql.git
```

Install the dependencies

```shell
npm install
```

Create a local `.env` 

```shell
touch .env.development.local
```

Copy the values (only the ones you need to change) from the `.env.development` file to this new file, for example:

```shell
# Database
DB_USER=joe
DB_PASSWORD=mysuperpassword
DB_DATABASE=loopback
```

> More details on the environment config [below](#environment).

Migrate the database

> See the [database](#database) section for this step.

Start the API

```shell
npm start
# or for dev (using tsc-watch)
npm run dev
```

You should now see the relevant URLs in your terminal.

## Database

Although designed with PostgreSQL in mind, there is no reason why you cannot change the datasource to another (e.g. MariaDB, Oracle, Mongo etc), it is LoopBack after all, and has many drivers. But we use PostgreSQL for this API

Once you have entered your database credentials [above](#setup), PostgreSQL is ready to go out-the-box. There is an example `user` model in the `models/` folder ready to go, to migrate this:

```shell
NODE_ENV=development npm run migrate
```

Now check your database and you should see a `user` table.

## GraphQL

GraphQL is built in to the service via the [openapi-to-graphql](https://github.com/IBM/openapi-to-graphql) and [graphql-http](https://github.com/graphql/graphql-http) libraries. This means, that GraphQL will run on the same port/url as your OAS3 RESTful API. For example:

```
RESTful: https://localhost:3200
GraphQL: https://localhost:3200/graphql
```

> GraphiQL is not currently supported.

## Environment

[dotenv-flow](https://github.com/kerimdzhanov/dotenv-flow) is used out the box, so please read the documentation over there for more on this.

It's also advisable to add any new env variables to the `src/env.d.ts` file to allow TypeScript insight.

----

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)
