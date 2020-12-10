import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllFormData(q: QueryGetListInput): FormDataPageData
  }

  type FormData {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã form"
    formId: String
    "User-Agent"
    ua: String
    "IP gửi"
    ip: String
    "Mã định danh"
    cookie: String
    "Dữ liệu"
    data: Mixed
  }

  type FormDataPageData {
    data: [FormData]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
