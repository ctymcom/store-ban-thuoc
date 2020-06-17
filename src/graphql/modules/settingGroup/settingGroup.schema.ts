import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    getAllSettingGroup(q: QueryGetListInput): SettingGroupPageData
    getOneSettingGroup(id: ID!, q: QueryGetOneInput): SettingGroup
  }

  extend type Mutation {
    createSettingGroup(data: CreateSettingGroupInput!): SettingGroup,
    updateSettingGroup(id: ID!, data: UpdateSettingGroupInput!): SettingGroup,
    deleteOneSettingGroup(id: ID!): SettingGroup,
    deleteManySettingGroup(ids: [ID]): Int,
  }

  input CreateSettingGroupInput {
    slug: String!
    name: String!
    desc: String
    readOnly: Boolean
  }

  input UpdateSettingGroupInput {
    slug: String!
    name: String!
    desc: String
    readOnly: Boolean
  }

  type SettingGroup {
    id: String,
    settings: [Setting]
    slug: String!
    name: String!
    desc: String
    readOnly: Boolean
    createdAt: DateTime
    updatedAt: DateTime
  }

  type SettingGroupPageData {
    data: [SettingGroup],
    total: Int
    pagination: Pagination
  }
`;

export default schema;
