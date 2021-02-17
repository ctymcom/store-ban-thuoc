import { gql } from "apollo-server-express";

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

    "Loại nhóm"
    type: CategoryType; 
    "Mã nhóm"
    code: string; 
    "Tên nhóm"
    name: string; 
    "Nhóm cha"
    parentIds: string[]; 
  }

  type CategoryPageData {
    data: [Category]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
