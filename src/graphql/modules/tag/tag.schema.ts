import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllTag(q: QueryGetListInput): TagPageData
    getOneTag(id: ID!): Tag
  }

  extend type Mutation {
    createTag(data: CreateTagInput!): Tag
    updateTag(id: ID!, data: UpdateTagInput!): Tag
    deleteOneTag(id: ID!): Tag
  }

  input CreateTagInput {
    "Tên tag"
    name: String!
    "Từ khoá"
    slug: String
    "Mô tả"
    description: String
    "Mã màu"
    accentColor: String
    "Hình ảnh đại diện"
    featureImage: String
  }

  input UpdateTagInput {
    "Tên tag"
    name: String
    "Từ khoá"
    slug: String
    "Mô tả"
    description: String
    "Mã màu"
    accentColor: String
    "Hình ảnh đại diện"
    featureImage: String
  }

  type Tag {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Tên tag"
    name: String
    "Từ khoá"
    slug: String
    "Mô tả"
    description: String
    "Mã màu"
    accentColor: String
    "Hình ảnh đại diện"
    featureImage: String
  }

  type TagPageData {
    data: [Tag]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
