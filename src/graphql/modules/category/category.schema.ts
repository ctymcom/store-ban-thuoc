import { gql } from "apollo-server-express";
import { CategoryType } from "./category.model";

const schema = gql`
  extend type Query {
    getAllCategory(q: QueryGetListInput): CategoryPageData
    getOneCategory(id: ID!): Category
    # Add Query
  }

  type Category {
    id: String    
    createdAt: DateTime
    updatedAt: DateTime

    "Loại nhóm ${Object.values(CategoryType)}"
    type: String
    "Mã nhóm"
    code: String
    "Tên nhóm"
    name: String
    "Nhóm cha"
    parentIds: [ID]

    parents: [Category]
  }

  type CategoryPageData {
    data: [Category]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
