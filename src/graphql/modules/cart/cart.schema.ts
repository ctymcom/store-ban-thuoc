import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllCart(q: QueryGetListInput): CartPageData
    getOneCart(id: ID!): Cart
    # Add Query
  }

  extend type Mutation {
    createCart(data: CreateCartInput!): Cart
    updateCart(id: ID!, data: UpdateCartInput!): Cart
    deleteOneCart(id: ID!): Cart
    # Add Mutation
  }

  input CreateCartInput {
    name: String
  }

  input UpdateCartInput {
    name: String
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
    paymentMethod: String
    "Sản phẩm giỏ hàng"
    itemIds: String
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
    items: [CartItem]
  }

  type CartPageData {
    data: [Cart]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
