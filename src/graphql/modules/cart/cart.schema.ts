import { gql } from "apollo-server-express";

const schema = gql`
  extend type Mutation {
    updateCart(data: UpdateCartInput!): Cart
    # Add Mutation
  }
  input UpdateCartInput {
    items: [CartItemInput]
  }

  type Cart {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã người dùng"
    userId: String
    "Sản phẩm giỏ hàng"
    items: [CartItem]
  }

  type CartPageData {
    data: [Cart]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
