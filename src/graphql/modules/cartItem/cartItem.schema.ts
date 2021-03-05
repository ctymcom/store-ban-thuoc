import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllCartItem(q: QueryGetListInput): CartItemPageData
    getOneCartItem(id: ID!): CartItem
    # Add Query
  }

  input UpdateCartItemInput {
    productId: ID!
    qty: Int!
  }

  type CartItem {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã giỏ hàng"
    cartId: ID
    "Mã người dùng"
    userId: String
    "Mã sản phẩm"
    productId: ID
    productCode: String
    "Đơn vị"
    unit: String
    "Số lượng"
    qty: Int
    "Giá bán"
    price: Float
    "Thành tiền"
    amount: Float

    product: Product
  }

  type CartItemPageData {
    data: [CartItem]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
