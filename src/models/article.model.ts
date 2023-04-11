import { Entity, model, property, belongsTo } from "@loopback/repository";

import { User, UserWithRelations } from "@models";

@model()
export class Article extends Entity {

  /**
   * ID
   */
  @property({
    id: true,
    type: "string",
    required: false,
    generated: true,
    useDefaultIdType: false,
    postgresql: {
      dataType: "uuid",
    },
  })
  id?: string;

  /**
   * User ID
   */
  @belongsTo(() => User, undefined, {
    type: "string",
    required: true,
    postgresql: {
      columnName: "user_id",
    },
  })
  userId: string;

  /**
   * Title
   */
  @property({
    type: "string",
    required: true,
    postgresql: {
      columnName: "title",
    },
  })
  title: string;

  /**
   * Created at
   */
  @property({
    type: "date",
    required: true,
    defaultFn: "now", 
    postgresql: {
      columnName: "created_at",
    },
  })
  createdAt: Date;

  /**
   * Updated at
   */
  @property({
    type: "date",
    defaultFn: "now", 
    postgresql: {
      columnName: "updated_at",
    },
  })
  updatedAt: Date;

  constructor(data?: Partial<Article>) {
    super(data);
  }
}

export interface ArticleRelations {
  user?: UserWithRelations;
}

export type ArticleWithRelations = Article & ArticleRelations;
