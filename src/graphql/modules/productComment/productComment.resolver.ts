import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
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

const Mutation = {
  createProductComment: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { data } = args;
    return await productCommentService.create(data);
  },
};

const ProductComment = {};

export default {
  Query,
  Mutation,
  ProductComment,
};
