import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { ProductModel } from "../product/product.model";
import { productCommentService } from "./productComment.service";

const Query = {
  getAllProductComment: async (root: any, args: any, context: Context) => {
    return productCommentService.fetch(args.q);
  },
  getOneProductComment: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await productCommentService.findOne({ _id: id });
  },
};

const ProductComment = {};

export default {
  Query,
  ProductComment,
};
