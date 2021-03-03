import { gql } from "apollo-server-express";
import { UserRole } from "./user.model";

const schema = gql`
extend type Query {
  getAllUser(q: QueryGetListInput): UserPageData
  getOneUser(id: ID!): User
  userGetMe: AritoUser
}

extend type Mutation {
  createUser(data: CreateUserInput!): User
  updateUser(id: ID!, data: UpdateUserInput!): User
  deleteOneUser(id: ID!): User
  deleteManyUser(ids: [ID]): Int
  login(idToken: String!, deviceId: String, deviceToken: String): LoginData
  updateUserPassword(id: ID!, password: String!): User
  userUpdateMe(data: UserUpdateMeInput!): LoginAritoData
}

input CreateUserInput {
  email: String!
  password: String!
  name: String
  phone: String
  address: String
  avatar: String
  provinceId: String
  districtId: String
  wardId: String
  """${Object.values(UserRole).join("|")}"""
  role: String
}

input UpdateUserInput {
  name: String
  phone: String
  address: String
  avatar: String
  provinceId: String
  districtId: String
  wardId: String
  """${Object.values(UserRole).join("|")}"""
  role: String
}

input UserUpdateMeInput {
  "Tên hiển thị"
  nickname: String
  "Điện thoại"
  phone: String
  "Ngày sinh"
  birthday: DateTime
  "Loại cửa hàng"
  companyType: String
  "Tên cửa hàng"
  companyName: String
}

type User {
  id: String
  uid: String
  email: String
  name: String
  phone: String
  address: String
  avatar: String
  province: String
  district: String
  ward: String
  provinceId: String
  districtId: String
  wardId: String
  """${Object.values(UserRole).join("|")}"""
  role: String
  createdAt: DateTime
  updatedAt: DateTime
}

type LoginData {
  user: User
  token: String
}

type UserPageData {
  data: [User]
  total: Int
  pagination: Pagination
}
`;

export default schema;
