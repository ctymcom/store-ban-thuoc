import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    getAllSetting(q: QueryInput): SettingPageData
    getSetting(_id: ID!): Setting
  }

  extend type Mutation {
    createSetting(data: CreateSettingInput!): Setting
    updateSetting(_id: ID!, data: UpdateSettingInput!): Setting
    deleteSetting(_id: ID!): Boolean
  }

  type Setting {
    _id: ID
    createdAt: DateTime
    updatedAt: DateTime
  }

  input CreateSettingInput {
    name: String
  }

  input UpdateSettingInput {
    name: String
  }

  type SettingPageData {
    data: [Setting]
    pagination: Pagination
  }
`;

export default schema;
