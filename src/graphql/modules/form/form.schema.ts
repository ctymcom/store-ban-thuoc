import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllForm(q: QueryGetListInput): FormPageData
    getOneForm(id: ID!): Form
  }

  extend type Mutation {
    createForm(data: CreateFormInput!): Form
    updateForm(id: ID!, data: UpdateFormInput!): Form
    deleteOneForm(id: ID!): Form
  }

  input CreateFormInput {
    name: String!
    code: String
    title: String!
    fields: [FormField]!
    redirectLink: String!
  }

  input UpdateFormInput {
    name: String
    code: String
    title: String
    fields: [FormField]
    redirectLink: String
  }

  type Form {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Tên biểu mẫu"
    name: String
    "Mã biểu mẫu"
    code: String
    "Tiêu đề hiển thị"
    title: String
    "Danh sách các trường dữ liệu"
    fields: [FormField]
    "Địa chỉ điều hướng"
    redirectLink: String
  }

  type FormPageData {
    data: [Form]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
