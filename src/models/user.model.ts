import { Entity, model, property } from "@loopback/repository";

@model()
export class User extends Entity {

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
   * Name
   */
  @property({
    type: "string",
    required: true,
    postgresql: {
      columnName: "name",
    },
  })
  name?: string;

  /**
   * Email
   */
  @property({
    type: "string",
    required: true,
  })
  email: string;

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

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
