import { BaseModel, CrudRepository } from "./crud.repo";

export interface UserPointLog extends BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  code: string;
  reasonCode: string;
  note: string;
  note2: string;
  status: string;
  value: number;
  convertedValue: string;
}

export class UserPointLogRepository extends CrudRepository<UserPointLog> {
  apiName = "UserPointLog";
  shortFragment = this.parseFragment(`
    id: String
    userId: String
    code: Int
    reasonCode: String
    note: String
    note2: String
    status: Int
    value: Float
    convertedValue: Float
  `);
  fullFragment = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    userId: String
    code: Int
    reasonCode: String
    note: String
    note2: String
    status: Int
    value: Float
    convertedValue: Float
  `);
}

export const UserPointLogService = new UserPointLogRepository();
