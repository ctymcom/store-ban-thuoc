import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllUserAddress(q: QueryGetListInput): UserAddressPageData
    getOneUserAddress(id: ID!): UserAddress
    # Add Query
  }

  extend type Mutation {
    createUserAddress(data: CreateUserAddressInput!): UserAddress
    updateUserAddress(id: ID!, data: UpdateUserAddressInput!): UserAddress
    deleteOneUserAddress(id: ID!): UserAddress
    # Add Mutation
  }

  input CreateUserAddressInput {
    "Tên liên hệ"
    contactName: String!
    "Số nhà tên đường"
    address: String!
    "Tỉnh / thành giao"
    provinceId: String!
    "Quận / huyện giao"
    districtId: String!
    "Phường / xã giao"
    wardId: String!
    "string"
    phone: String!
    "Tạo độ"
    location: String
    "Địa chỉ mặc định"
    isDefault: Boolean
  }

  input UpdateUserAddressInput {
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
    "Địa chỉ mặc định"
    isDefault: Boolean
  }

  type UserAddress {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã người dùng"
    userId: String
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
    "Địa chỉ mặc định"
    isDefault: Boolean
  }

  type UserAddressPageData {
    data: [UserAddress]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
