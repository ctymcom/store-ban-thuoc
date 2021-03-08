import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllPaymentMethod(q: QueryGetListInput): PaymentMethodPageData
    getOnePaymentMethod(id: ID!): PaymentMethod
    # Add Query
  }

  type PaymentMethod {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã thanh toán"
    code: String
    "Tên thanh toán"
    name: String
    "Tên tiếng anh"
    name2: String
    "Tỷ lệ chiết khấu"
    discountRate: Float
    "Vị trí"
    position: Int
  }

  type PaymentMethodPageData {
    data: [PaymentMethod]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
