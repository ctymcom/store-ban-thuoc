import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllCartItem(q: QueryGetListInput): CartItemPageData
    getOneCartItem(id: ID!): CartItem
    # Add Query
  }

  type CartItem {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã sản phẩm"
    productId: ID
    "Số lượng"
    qty: Int
    "Giá bán"
    price: Float
    "Thành tiền"
    amount: Float
  }

  type CartItemPageData {
    data: [CartItem]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
