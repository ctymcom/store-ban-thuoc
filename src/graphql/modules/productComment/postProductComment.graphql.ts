import { gql } from "apollo-server-express";
import { ROLES } from "../../../constants/role.const";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { ProductModel } from "../product/product.model";

export default {
  schema: gql`
    extend type Mutation {
      postProductComment(data: PostProductCommentInput!): String
    }
    input PostProductCommentInput {
      "Mã sản phẩm"
      productId: String!
      "Tên người đánh giá"
      reviewerName: String!
      "Điểm đánh giá"
      imark: Int!
      "Nội dung đánh giá"
      content: String!
    }
  `,
  resolver: {
    Mutation: {
      postProductComment: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        const { data } = args;
        const { productId, reviewerName, imark, content } = data;
        const product = await ProductModel.findById(productId);
        if (!product) throw Error("Không thể đánh giá.");
        return await AritoHelper.postComment(
          {
            type: "PRODUCT",
            code: product.code,
            reviewer: reviewerName,
            content: content,
            imark: imark,
          },
          context.tokenData.ref
        );
      },
    },
  },
};
