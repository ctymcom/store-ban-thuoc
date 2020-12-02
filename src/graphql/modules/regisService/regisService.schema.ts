import { gql } from "apollo-server-express";
import { RegisServiceStatus } from "./regisService.model";

const schema = gql`
  extend type Query {
    getAllRegisService(q: QueryGetListInput): RegisServicePageData
    getOneRegisService(id: ID!): RegisService
  }

  extend type Mutation {
    createRegisService(data: CreateRegisServiceInput!): RegisService
  }

  input CreateRegisServiceInput {
    name: String
  }

  type RegisService {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã đăng ký"
    code: String
    "Chủ shop"
    sellerId: ID
    "Sản phẩm"
    productId: ID
    "Tên sản phẩm"
    productName: String
    "Giá sản phẩm"
    basePrice: Float
    "Khách hàng"
    registerId: ID
    "Tên khách hàng"
    registerName: String
    "Điện thoại đăng ký"
    registerPhone: String
    "Địa chỉ"
    address: String
    "Tỉnh / thành"
    province: String
    "Quận / huyện"
    district: String
    "Phường / xã"
    ward: String
    "Mã Tỉnh / thành"
    provinceId: String
    "Mã Quận / huyện"
    districtId: String
    "Mã Phường / xã"
    wardId: String
    "Trạng thái ${Object.values(RegisServiceStatus)}"
    status: String 
    "Hoa hồng Mobifone"
    commission0: Float
    "Hoa hồng điểm bán"
    commission1: Float
    "Hoa hồng giới thiệu"
    commission2: Float
    "Điểm thường người bán"
    sellerBonusPoint: Float
    "Điểm thưởng người mua"
    buyerBonusPoint: Float

    seller: Member
    product: Product
    register: Customer
  }

  type RegisServicePageData {
    data: [RegisService]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
