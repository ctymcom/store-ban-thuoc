import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllDeliveryMethod(q: QueryGetListInput): DeliveryMethodPageData
    getOneDeliveryMethod(id: ID!): DeliveryMethod
    # Add Query
  }

  type DeliveryMethod {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã vận chuyển"
    code: String
    "Tên vận chuyển"
    name: String
    "Tên tiếng anh"
    name2: String
    "Tỷ lệ chiết khấu"
    discountRate: Float
    "Thứ tự"
    position: Int
  }

  type DeliveryMethodPageData {
    data: [DeliveryMethod]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
