import { gql } from 'apollo-server-express';
import { SettingType } from '../../../constants';

const schema = gql`
  extend type Query {
    getAllSetting(q: QueryGetListInput): SettingPageData
    getOneSetting(id: ID!, q: QueryGetOneInput): Setting
  }

  extend type Mutation {
    createSetting(data: CreateSettingInput!): Setting,
    updateSetting(id: ID!, data: UpdateSettingInput!): Setting,
    deleteOneSetting(id: ID!): Setting,
    deleteManySetting(ids: [ID]): Int,
  }

  input CreateSettingInput {
    settingGroupId: String
    """${Object.keys(SettingType).join('|')}"""
    type: String
    name: String
    key: String
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
  }

  input UpdateSettingInput {
    settingGroupId: String
    """${Object.keys(SettingType).join('|')}"""
    type: String
    name: String
    key: String
    value: Mixed
    isActive: Boolean
    isPrivate: Boolean
    readOnly: Boolean
  }

  type Setting {
    id: String,
    settingGroupId: String
    settingGroup: SettingGroup
    """${Object.keys(SettingType).join('|')}"""
    type: String
    name: String
    key: String
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
