import { gql } from "apollo-server-express";

export default gql`
  type CartItem {
    id: String
    "Mã người dùng"
    userId: String
    "Mã sản phẩm"
    productId: ID
    "Mã vật tư"
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

  input CartItemInput {
    "Mã sản phẩm"
    productId: ID
    "Số lượng"
    qty: Int
  }
`;
