import { gql } from 'apollo-server-express';
import { SettingTypeEnum } from '../../../constants/setting.const';

const schema = gql`
  extend type Query {
    getAllSetting(q: QueryGetListInput): SettingPageData
    getOneSetting(id: ID!, q: QueryGetOneInput): Setting
  }

  extend type Mutation {
    createSetting(data: CreateSettingInput!): Setting,
    updateSetting(id: ID!, data: UpdateSettingInput!): Setting,
  }

  input CreateSettingInput {
    settingGroupId: String
    """${Object.keys(SettingTypeEnum).join('|')}"""
    type: String!
    name: String!
    key: String!
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
  }

  input UpdateSettingInput {
    settingGroupId: String
    """${Object.keys(SettingTypeEnum).join('|')}"""
    type: String!
    name: String!
    key: String!
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
  }

  type Setting {
    id: String,
    settingGroupId: String
    settingGroup: SettingGroup
    """${Object.keys(SettingTypeEnum).join('|')}"""
    type: String!
    name: String!
    key: String!
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  type SettingPageData {
    data: [Setting],
    total: Int
    pagination: Pagination
  }
`;

export default schema;
