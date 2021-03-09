import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllProductComment(q: QueryGetListInput): ProductCommentPageData
    getOneProductComment(id: ID!): ProductComment
    # Add Query
  }

  type ProductComment {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã bình luận"
    code: String
    "Mã sản phẩm"
    productId: ID
    "Mã sản phẩm tham chiếu"
    productCode: String
    "điểm đánh giá"
    imark: Int
    "nội dung đánh giá"
    content: String
    "người đánh giá"
    reviewer: String
  }

  type ProductCommentPageData {
    data: [ProductComment]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
