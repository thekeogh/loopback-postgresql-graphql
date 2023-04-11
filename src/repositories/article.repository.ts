import { inject } from "@loopback/core";
import { DefaultCrudRepository } from "@loopback/repository";

import { DbDataSource } from "@datasources";

import { Article, ArticleRelations } from "@models";

export class ArticleRepository extends DefaultCrudRepository<
  Article,
  typeof Article.prototype.id,
  ArticleRelations
> {
  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
  ) {
    super(Article, dataSource);
  }
}
