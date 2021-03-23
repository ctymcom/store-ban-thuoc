import { gql } from "apollo-server-express";
import { ErrorHelper } from "../../../base/error";
import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { ProductModel } from "./product.model";

export default {
  schema: gql`
    extend type Mutation {
      rateProductPrice(productId: ID!, isHigh: Boolean!): Product
    }
  `,
  resolver: {
    Mutation: {
      rateProductPrice: async (root: any, args: any, context: Context) => {
        context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
        const { productId, isHigh } = args;
        const product = await ProductModel.findById(productId);
        if (!product) throw ErrorHelper.mgRecoredNotFound("Sản phẩm");
        if (isHigh) {
          product.highPriceCount++;
          await product.updateOne({ $inc: { highPriceCount: 1 } }).exec();
        } else {
          product.lowPriceCount++;
          await product.updateOne({ $inc: { lowPriceCount: 1 } }).exec();
        }
        return product;
      },
    },
  },
};
