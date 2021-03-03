import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllPromotion(q: QueryGetListInput): PromotionPageData
    getOnePromotion(id: ID!): Promotion
    # Add Query
  }

  type Promotion {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã khuyến mãi"
    code: String
    "Tên khuyến mãi"
    name: String
    "Mô tả"
    description: String
  }

  type PromotionPageData {
    data: [Promotion]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
