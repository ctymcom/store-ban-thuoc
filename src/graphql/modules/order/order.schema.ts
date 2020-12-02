import { gql } from "apollo-server-express";
import { OrderStatus } from "./order.model";

const schema = gql`
  extend type Query {
    getAllOrder(q: QueryGetListInput): OrderPageData
    getOneOrder(id: ID!): Order
  }

  extend type Mutation {
    createOrder(data: CreateOrderInput!): Order
  }

  input CreateOrderInput {
    name: String
  }

  type Order {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã đơn hàng"
    code: String 
    "Đơn Mobifone"
    isPrimary: String 
    "Danh sách sản phẩm"
    itemIds: [ID]
    "Thành tiền"
    amount: Float 
    "Tổng tiền hàng"
    subTotal: Float 
    "Số lượng sản phẩm"
    itemCount: Int 
    "Chủ shop bán"
    sellerId: ID 
    "Trạng thái ${Object.values(OrderStatus)}"
    status: String
    "Người cập nhật"
    updatedByUserId: ID 
    "Hoa hồng Mobifone"
    commission0: Float
    "Hoa hồng điểm bán"
    commission1: Float
    "Hoa hồng giới thiệu"
    commission2: Float
    "Khách hàng mua"
    buyerId: ID 
    "Tên khách hàng"
    buyerName: String 
    "Điện thoại khách hàng"
    buyerPhone: String 
    "Địa chỉ khách hàng"
    buyerAddress: String 
    "Tỉnh / thành"
    buyerProvince: String 
    "Quận / huyện"
    buyerDistrict: String 
    "Phường / xã"
    buyerWard: String 
    "Mã Tỉnh / thành"
    buyerProvinceId: String 
    "Mã Quận / huyện"
    buyerDistrictId: String 
    "Mã Phường / xã"
    buyerWardId: String 
    "Điểm thường người bán"
    sellerBonusPoint: Float
    "Điểm thưởng người mua"
    buyerBonusPoint: Float

    items: [OrderItem]
    seller: Member
    updatedByUser: User
    buyer: Customer
  }

  type OrderPageData {
    data: [Order]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
