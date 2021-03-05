import { gql } from "apollo-server-express";

const schema = gql`
  extend type Mutation {
    updateCart(data: UpdateCartInput!): Cart
    # Add Mutation
  }
  input UpdateCartInput {
    items: [CartItemInput]
    shipMethod: String
    paymentMethod: String
  }

  type Cart {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã người dùng"
    userId: String
    "Số lượng sản phẩm"
    itemCount: Float
    "Tổng tiền hàng"
    subtotal: Float
    "Phí ship"
    shipfee: Float
    "Giảm giá"
    discount: Float
    "Tổng thành tiền"
    amount: Float
    "Phương thức vận chuyển"
    shipMethod: String
    "Phương thức thanh toán"
    paymentMethod: Int
    "Sản phẩm giỏ hàng"
    items: [CartItem]
    "Mã khuyến mãi"
    discountId: String
    "Tên khuyến mãi"
    discountName: String
    "Tỷ lệ chiết khấu %"
    discountRate: Float
    "Sử dụng điểm đổi thưởng"
    usePoint: Boolean
    "Mã địa chỉ"
    addressId: ID

    address: UserAddress
  }

  type CartPageData {
    data: [Cart]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
