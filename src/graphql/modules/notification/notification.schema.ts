import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllNotification(q: QueryGetListInput): NotificationPageData
    getOneNotification(id: ID!): Notification
    # Add Query
  }

  type Notification {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã người dùng"
    userId: String
    "Mã thông báo"
    code: String
    "Tiêu đề"
    title: String
    "Nội dung thông báo"
    content: String
    "Đường dẫn liên kết"
    link: String
    "Loại hành động"
    controller: String
    "Trạng thái"
    status: Int
  }

  type NotificationPageData {
    data: [Notification]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
