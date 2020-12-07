import { gql } from "apollo-server-express";
import { Gender } from "../member/member.model";

const schema = gql`
  extend type Query {
    getAllCustomer(q: QueryGetListInput): CustomerPageData
    getOneCustomer(id: ID!): Customer
  }

  extend type Mutation {
    loginCustomerByToken(idToken: String!, psid: String, pageId: String): CustomerLoginData
  }

  type CustomerLoginData {
    customer: Customer
    token: String
  }

  type Customer {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã khách hàng"
    code: String
    "Tên khách hàng"
    name: String
    "Tên facebook"
    facebookName: String
    "UID Firebase"
    uid: String
    "Số điện thoại"
    phone: String
    "Avatar"
    avatar: String
    "Giới tính ${Object.values(Gender)}"
    gender: String
    "Ngày sinh"
    birthday: DateTime
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
    "Điểm tích lũy"
    cumulativePoint: Float
    "Danh sách account facebook của người dùng"
    pageAccounts: [CustomerPageAccount]
  }

  type CustomerPageAccount {
    "PSID người dùng"
    psid: String
    "ID của Fanpage"
    pageId: String
    "Mã thành viên"
    memberId: ID

    member: Member
  }

  type CustomerPageData {
    data: [Customer]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
