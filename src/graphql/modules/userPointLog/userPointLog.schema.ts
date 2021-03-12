import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllUserPointLog(q: QueryGetListInput): UserPointLogPageData
    getOneUserPointLog(id: ID!): UserPointLog
    # Add Query
  }

  type UserPointLog {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã người dùng"
    userId: String
    "Mã log"
    code: Int
    "Mã lý do"
    reasonCode: String
    "Ghi chú"
    note: String
    "Ghi chú tiếng anh"
    note2: String
    "Trạng thái"
    status: Int
    "Giá trị"
    value: Float
    "Tiền chuyển đổi"
    convertedValue: Float
  }

  type UserPointLogPageData {
    data: [UserPointLog]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
