import { gql } from "apollo-server-express";

export default {
  schema: gql`
    extend type Product {
      tabDetails: [ProductTagDetail]
    }
    type ProductTagDetail {
      "Mã tag"
      code: String
      "Tên tag"
      name: String
      "Tên tiếng anh"
      name2: String
      "Màu sắc"
      color: String
      "Mã icon"
      icon: String
      "Thứ tự"
      position: Int
      "Ngày cần date"
      outOfDate: DateTime
    }
  `,
};
