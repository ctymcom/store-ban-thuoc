import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllBankAccount(q: QueryGetListInput): BankAccountPageData
    getOneBankAccount(id: ID!): BankAccount
    # Add Query
  }

  type BankAccount {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "unit_id"
    unitID: String
    "Mã tài khoản"
    account: String
    "Tên tài khoản"
    bankAccount: String
    "Chủ tài khoản"
    accountOwner: String
    "Tên ngân hàng"
    bankName: String
    "Tên ngân hàng tiếng anh"
    bankName2: String
    "Tên tỉnh/ thành"
    province: String
    "Điện thoại"
    phone: String
    "Fax"
    fax: String
    "email"
    email: String
    "Trang chủ"
    homePage: String
    "Đối tác"
    partner: String
    "Mã Số thuế"
    taxCode: String
    "Ghi chú"
    note: String
    "Chi nhánh"
    branch: String
  }
  type BankAccountPageData {
    data: [BankAccount]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
