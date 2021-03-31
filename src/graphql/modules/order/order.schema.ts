import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllOrder(q: QueryGetListInput): OrderPageData
    getOneOrder(id: ID!): Order
    # Add Query
  }

  extend type Mutation {
    createOrder(data: CreateOrderInput!): Order
    
    # Add Mutation
  }

  input CreateOrderInput {
    promotionCode: String
    paymentMethod: String!
    deliveryMethod: String!
    addressId: ID!
    note: String
    usePoint: Boolean
    items: [OrderItemInput]!
  }

  type Order {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã người dùng"
    userId: String
    "Mã đơn hàng"
    code: Int
    "Mã chứng từ"
    orderNumber: String
    "Mã địa chỉ"
    addressId: String
    "Tên địa chỉ đầy đủ"
    fullAddress: String
    "Tên liên hệ"
    contactName: String
    "Số nhà tên đường"
    address: String
    "Tỉnh / thành giao"
    provinceId: String
    "Quận / huyện giao"
    districtId: String
    "Phường / xã giao"
    wardId: String
    "string"
    phone: String
    "Tạo độ"
    location: String
    "Chi tiết đơn hàng"
    items: [OrderItem]
    "Tổng tiền hàng"
    subtotal: Float
    "Tiền giảm giá"
    discount: Float
    "Thành tiền"
    amount: Float
    "Mã khuyến mãi"
    promotionCode: String
    "Phương thức thanh toán"
    paymentMethod: String
    "Phương thức vận chuyển"
    deliveryMethod: String
    "Sử dụng điểm"
    usePoint: Boolean
    "Trạng thái đơn hàng"
    status: Int
    "Số lượng sản phẩm"
    itemCount: Int
  }

  type OrderPageData {
    data: [Order]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
