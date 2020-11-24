import { gql } from "apollo-server-express";
import { Gender, MemberType } from "./member.model";

const schema = gql`
  extend type Query {
    getAllMember(q: QueryGetListInput): MemberPageData
    getOneMember(id: ID!): Member
  }

  extend type Mutation {
    createMember(data: CreateMemberInput!): Member
    updateMember(id: ID!, data: UpdateMemberInput!): Member
    deleteOneMember(id: ID!): Member
    deleteManyMember(ids: [ID]): Int
    loginMember(idToken: String!): MemberLoginData
    updateMemberPassword(memberId: ID!, password: String!): Member
    connectChatbot(apiKey: String!): Member
  }

  type MemberLoginData {
    member: Member
    token: String
  }

  input CreateMemberInput {
    username: String!
    name: String!
    avatar: String
    phone: String!
    shopName: String
    address: String
    provinceId: String
    districtId: String
    wardId: String
    identityCardNumber: String
    gender: String
    birthday: DateTime
    parentIds: [ID]
    activated: Boolean
    type: String!
    branchId: ID!
    password: String!
  }

  input UpdateMemberInput {
    name: String
    avatar: String
    phone: String
    shopName: String
    address: String
    provinceId: String
    districtId: String
    wardId: String
    identityCardNumber: String
    gender: String
    birthday: DateTime
    parentIds: [ID]
    activated: Boolean
    type: String
    branchId: ID
  }

  type Member {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã chủ shop"
    username: String
    "UID Firebase"
    uid: String
    "Họ tên"
    name: String
    "Avatar"
    avatar: String
    "Điện thoại"
    phone: String
    "Mã Fanpage"
    fanpageId: String
    "Tên Fanpage"
    fanpageName: String
    "Hình Fanpage"
    fanpageImage: String
    "Tên cửa hàng"
    shopName: String
    "Điểm tích lũy"
    cumulativePoint: Float
    "Hoa hồng"
    commission: Float
    "Địa chỉ"
    address: String
    "Mã Tỉnh/thành"
    provinceId: String
    "Mã Quận/huyện"
    districtId: String
    "Mã Phường/xã"
    wardId: String
    "Tỉnh/thành"
    province: String
    "Quận/huyện"
    district: String
    "Phường/xã"
    ward: String
    "CMND"
    identityCardNumber: String
    "Giới tính ${Object.values(Gender)}"
    gender: String
    "Sinh nhật"
    birthday: DateTime
    "Mã người giới thiệu"
    parentIds: [ID]
    "Ngày đăng ký"
    activedAt: DateTime
    "Chủ shop đã kích hoạt"
    activated: Boolean
    "Loại chủ shop ${Object.values(MemberType)}"
    type: String
    "Mã chi nhánh"
    branchId: ID

    branch: Branch
  }

  type MemberPageData {
    data: [Member]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
