import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllProductTag(q: QueryGetListInput): ProductTagPageData
    getOneProductTag(id: ID!): ProductTag
    # Add Query
  }

  type ProductTag {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã tag"
    code: String
    "Tên tag"
    name: String
    "Tên tiếng anh"
    name2: String
    "Màu sắc"
    color: String
    "Mã icon"
    icon: String
    "Thứ tự"
    position: Int
  }

  type ProductTagPageData {
    data: [ProductTag]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
