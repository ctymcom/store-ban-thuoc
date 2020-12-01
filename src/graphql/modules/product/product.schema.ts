import { gql } from "apollo-server-express";
import { ProductType } from "./product.model";

const schema = gql`
  extend type Query {
    getAllProduct(q: QueryGetListInput): ProductPageData
    getOneProduct(id: ID!): Product
  }

  extend type Mutation {
    createProduct(data: CreateProductInput!): Product
    updateProduct(id: ID!, data: UpdateProductInput!): Product
    deleteOneProduct(id: ID!): Product
    deleteManyProduct(ids: [ID]): Int
  }

  input CreateProductInput {
    code: String
    name: String!
    basePrice: Float!
    subtitle: String
    intro: String
    image: String!
    categoryId: ID
    allowSale: Boolean
    type: String
    smsSyntax: String
    smsPhone: String
  }

  input UpdateProductInput {
    code: String
    name: String
    basePrice: Float
    subtitle: String
    intro: String
    image: String
    categoryId: ID
    allowSale: Boolean
    type: String
    smsSyntax: String
    smsPhone: String
  }

  type Product {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã sản phẩm"
    code: String
    "Tên sản phẩm"
    name: String
    "Sản phẩm chính"
    isPrimary: Boolean
    "Sản phẩm bán chéo"
    isCrossSale: Boolean
    "Tồn kho bán chéo"
    crossSaleInventory: Int
    "Loại sản phẩm ${Object.values(ProductType)}"
    type: String
    "Gía bán"
    basePrice: Float
    "Mô tả ngắn"
    subtitle: String
    "Giới thiệu sản phẩm"
    intro: String
    "Hình ảnh đại diện"
    image: String
    "Hoa hồng Mobifone"
    commission0: Float
    "Hoa hồng điểm bán"
    commission1: Float
    "Hoa hồng giới thiệu"
    commission2: Float
    "Thưởng cho điểm bán"
    enabledMemberBonus: Boolean
    "Thưởng cho khách hàng"
    enabledCustomerBonus: Boolean
    "Hệ số thưởng điểm bán"
    memberBonusFactor: Float
    "Hệ số thưởng khách hàng"
    customerBonusFactor: Float
    "Danh mục sản phẩm"
    categoryId: ID
    "Cú pháp SMS"
    smsSyntax: String
    "SMS tới số điện thoại"
    smsPhone: String
    "Mở bán"
    allowSale: Boolean
    "Mã thành viên quản lý sản phẩm"
    memberId: ID

    category: Category
    member: Member
  }

  type ProductPageData {
    data: [Product]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
