import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllProductTab(q: QueryGetListInput): ProductTabPageData
    getOneProductTab(id: ID!): ProductTab
    # Add Query
  }

  type ProductTab {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã tab"
    code: String
    "Tên tiếng việt"
    name: String
    "Tên tiếng anh"
    name2: String
    "Tên field láy dữ liệu"
    productField: String
  }

  type ProductTabPageData {
    data: [ProductTab]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
