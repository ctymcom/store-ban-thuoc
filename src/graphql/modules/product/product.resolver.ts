import { omit } from "lodash";
import { ErrorHelper } from "../../../base/error";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { CategoryLoader } from "../category/category.model";
import { MemberHelper } from "../member/member.helper";
import { MemberLoader } from "../member/member.model";
import { ProductHelper } from "./product.helper";
import { ProductModel, ProductType } from "./product.model";
import { productService } from "./product.service";

const Query = {
  getAllProduct: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    return productService.fetch(args.q);
  },
  getOneProduct: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER_CUSTOMER);
    const { id } = args;
    return await productService.findOne({ _id: id });
  },
};

const Mutation = {
  createProduct: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);
    const { data } = args;
    if (context.tokenData.role == ROLES.MEMBER) {
      const product = new ProductModel({
        code: data.code || (await ProductHelper.generateCode()),
        name: data.name,
        basePrice: data.basePrice,
        subtitle: data.subtitle,
        intro: data.intro,
        image: data.image,
        categoryId: data.categoryId,
        allowSale: data.allowSale,
        memberId: context.tokenData._id,
      });
      return product.save();
    }
    const product = new ProductModel(data);
    product.isPrimary = true;
    return await product;
  },
  updateProduct: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);
    const { id, data } = args;
    if (context.tokenData.role == ROLES.MEMBER) {
      const product = await ProductModel.findById(id);
      if (product.memberId.toString() != context.tokenData._id) {
        throw ErrorHelper.permissionDeny();
      }
      return product.updateOne({ $set: omit(data, ["isPrimary", ""]) });
    }
    return await productService.updateOne(id, data);
  },
  deleteOneProduct: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await productService.deleteOne(id);
  },
  deleteManyProduct: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await productService.deleteMany(ids);
    return result;
  },
};

const Product = {
  category: GraphQLHelper.loadById(CategoryLoader, "categoryId"),
  member: GraphQLHelper.loadById(MemberLoader, "memberId"),
};

export default {
  Query,
  Mutation,
  Product,
};
