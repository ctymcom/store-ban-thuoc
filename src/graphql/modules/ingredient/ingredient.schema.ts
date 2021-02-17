import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllIngredient(q: QueryGetListInput): IngredientPageData
    getOneIngredient(id: ID!): Ingredient
    # Add Query
  }
  type Ingredient {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã hoạt chất"
    code: String
    "Tên hoạt chất"
    name: String
  }

  type IngredientPageData {
    data: [Ingredient]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
