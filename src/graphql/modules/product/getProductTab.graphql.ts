import { gql } from "apollo-server-express";
import { Context } from "../../context";
import { productTabService } from "../productTab/productTab.service";

export default {
  schema: gql`
    extend type Product {
      tabs: [ProductTabContent]
    }
    type ProductTabContent {
      "Tên tiếng việt"
      name: String
      "Tên tiếng anh"
      name2: String
      "Nội dung"
      content: String
    }
  `,
};
