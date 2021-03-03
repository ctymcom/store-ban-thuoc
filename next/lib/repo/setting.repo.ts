import { BaseModel, CrudRepository } from "./crud.repo";
import { SettingGroup } from "./setting-group.repo";

export interface Setting extends BaseModel {
  type: string;
  name: string;
  key: string;
  value: any;
  isActive: boolean;
  isPrivate: boolean;
  readOnly: boolean;
  groupId: string;
  group: SettingGroup;
}

export class SettingRepository extends CrudRepository<Setting> {
  apiName: string = "Setting";
  shortFragment: string = this.parseFragment(`
    id: String
    type: String
    name: String
    key: String
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
    groupId: String
    createdAt: DateTime
    updatedAt: DateTime
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    type: String
    name: String
    key: String
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
    groupId: String
    createdAt: DateTime
    updatedAt: DateTime
    group {
      id: String
      slug: String
      name: String
      desc: String
      readOnly: Boolean
      createdAt: DateTime
      updatedAt: DateTime
    }: SettingGroup
  `);
}

export const SettingService = new SettingRepository();
