import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllAritoOption(q: QueryGetListInput): AritoOptionPageData
    getOneAritoOption(id: ID!): AritoOption
    # Add Query
  }

  type AritoOption {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã option"
    code: String
    "Tên option"
    name: String
    "Tên tiếng anh"
    name2: String
    "Giá trị"
    value: String
  }

  type AritoOptionPageData {
    data: [AritoOption]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
