import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllBankAccount(q: QueryGetListInput): BankAccountPageData
    getOneBankAccount(id: ID!): BankAccount
    # Add Query
  }

  extend type Mutation {
    createBankAccount(data: CreateBankAccountInput!): BankAccount
    updateBankAccount(id: ID!, data: UpdateBankAccountInput!): BankAccount
    deleteOneBankAccount(id: ID!): BankAccount
    # Add Mutation
  }

  input CreateBankAccountInput {
    name: String
  }

  input UpdateBankAccountInput {
    name: String
  }

  type BankAccount {
    id: String    
    createdAt: DateTime
    updatedAt: DateTime
    ""
    unitID: String
    ""
    account:String
    bankAccount:String
    accountOwner:String
    bankName:String
    bankName2:String
    province:String
    phone:String
    fax:String
    email:String
    homePage:String
    partner:String
    taxCode:String
    note:String
    branch:String
  }
  type BankAccountPageData {
    data: [BankAccount]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
