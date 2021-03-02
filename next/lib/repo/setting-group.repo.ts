import { BaseModel, CrudRepository } from "./crud.repo";
import { Setting } from "./setting.repo";

export interface SettingGroup extends BaseModel {
  slug: string;
  name: string;
  desc: string;
  readOnly: boolean;
  settings: Setting[];
}

export class SettingGroupRepository extends CrudRepository<SettingGroup> {
  apiName: string = "SettingGroup";
  shortFragment: string = this.parseFragment(`
    id: String
    slug: String
    name: String
    desc: String
    readOnly: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    slug: String
    name: String
    desc: String
    readOnly: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    settings {
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
    }: [Setting]
  `);
}

export const SettingGroupService = new SettingGroupRepository();
