import { gql } from "apollo-server-express";

export default gql`
  type CartItem {
    "Mã sản phẩm"
    productId: ID
    "Mã vật tư"
    productCode: String
    "Số lượng"
    qty: Int

    product: Product
  }

  input CartItemInput {
    "Mã sản phẩm"
    productId: ID
    "Mã đinh danh sản phẩm"
    productCode: String
    "Số lượng"
    qty: Int
  }
`;
