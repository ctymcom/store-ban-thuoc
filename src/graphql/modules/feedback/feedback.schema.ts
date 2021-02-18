import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllFeedback(q: QueryGetListInput): FeedbackPageData
    getOneFeedback(id: ID!): Feedback
    # Add Query
  }

  extend type Mutation {
    createFeedback(data: CreateFeedbackInput!): Feedback
    updateFeedback(id: ID!, data: UpdateFeedbackInput!): Feedback
    deleteOneFeedback(id: ID!): Feedback
    # Add Mutation
  }

  input CreateFeedbackInput {
    "Tên người phản hồi"
    name: String!
    "Tiêu đề phản hồi"
    title: String!
    "Hình đại diện"
    avatar: String!
    "Nội dung phản hồi"
    content: String!
    "Độ ưu tiên"
    priority: Int
  }

  input UpdateFeedbackInput {
    "Tên người phản hồi"
    name: String
    "Tiêu đề phản hồi"
    title: String
    "Hình đại diện"
    avatar: String
    "Nội dung phản hồi"
    content: String
    "Độ ưu tiên"
    priority: Int
  }

  type Feedback {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Tên người phản hồi"
    name: String
    "Tiêu đề phản hồi"
    title: String
    "Hình đại diện"
    avatar: String
    "Nội dung phản hồi"
    content: String
    "Độ ưu tiên"
    priority: Int
  }

  type FeedbackPageData {
    data: [Feedback]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
