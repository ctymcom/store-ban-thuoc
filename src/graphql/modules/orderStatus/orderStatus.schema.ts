import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllOrderStatus(q: QueryGetListInput): OrderStatusPageData
    getOneOrderStatus(id: ID!): OrderStatus
    # Add Query
  }

  type OrderStatus {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã trạng thái"
    code: Int
    "Tên trạng thái"
    name: String
    "Tên trạng thái tiếng anh"
    name2: String
    "Thứ tự"
    position: Int
  }

  type OrderStatusPageData {
    data: [OrderStatus]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
