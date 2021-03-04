import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllProductContainer(q: QueryGetListInput): ProductContainerPageData
    getOneProductContainer(id: ID!): ProductContainer
    # Add Query
  }

  type ProductContainer {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã nhóm"
    code: Int
    "Tên nhóm"
    name: String
    "Tên nhóm tiếng việt"
    name2: String
    "Mã tag"
    tagCode: String
    "Ghi chú"
    note: String
    "vị trí"
    position: Int
  }

  type ProductContainerPageData {
    data: [ProductContainer]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
