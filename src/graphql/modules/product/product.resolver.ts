import { Context } from "../../context";
import { productService } from "./product.service";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { CategoryLoader } from "../category/category.model";
import { IngredientLoader } from "../ingredient/ingredient.model";
import { IProduct } from "./product.model";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { set } from "lodash";

const Query = {
  getAllProduct: async (root: any, args: any, context: Context) => {
    set(args, "q.filter.basePrice", { $gt: 0 });
    return productService.fetch(args.q);
  },
  getOneProduct: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await productService.findOne({ _id: id });
  },
};

const Product = {
  categories: GraphQLHelper.loadManyById(CategoryLoader, "categoryIds"),
  ingredients: GraphQLHelper.loadManyById(IngredientLoader, "ingredientIds"),
  image: async (root: IProduct, args: any, context: Context) => {
    return AritoHelper.getImageLink(root.imageId);
  },
  imageS: async (root: IProduct, args: any, context: Context) => {
    return AritoHelper.getImageLink(root.imageId, 200);
  },
  imageM: async (root: IProduct, args: any, context: Context) => {
    return AritoHelper.getImageLink(root.imageId, 576);
  },
  imageL: async (root: IProduct, args: any, context: Context) => {
    return AritoHelper.getImageLink(root.imageId, 1024);
  },
  basePrice: getGroupPrice("basePrice"),
  salePrice: getGroupPrice("salePrice"),
  saleRate: getGroupPrice("saleRate"),
  saleExpiredDate: getGroupPrice("saleExpiredDate"),
};

function getGroupPrice(field: string) {
  return async (root: IProduct, args: any, context: Context) => {
    if (!context.isAuth || !context.user) return null;
    if (context.user.group && context.user.group != "") {
      const groupPrice = root.priceGroups.find((p) => p.customerGroup == context.user.group);
      if (groupPrice) {
        return groupPrice[field];
      }
    }
    return root[field];
  };
}

export default {
  Query,
  Product,
};
