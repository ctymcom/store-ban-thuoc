import { Context } from "../../context";
import { productService } from "./product.service";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { CategoryLoader, CategoryModel } from "../category/category.model";
import { IngredientLoader } from "../ingredient/ingredient.model";
import { IProduct } from "./product.model";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { set } from "lodash";
import { SettingHelper } from "../setting/setting.helper";
import { SettingKey } from "../../../configs/settingData";

const Query = {
  getAllProduct: async (root: any, args: any, context: Context) => {
    set(args, "q.filter.salePrice", { $gt: 0 });
    const hiddenCategories = await SettingHelper.load(SettingKey.HIDDEN_PRODUCT_OF_CATEGORIES);
    if (hiddenCategories.length > 0) {
      const categories = await CategoryModel.find({ name: { $in: hiddenCategories } });
      if (categories.length > 0) {
        set(args, "q.filter.$and.0.categoryIds", { $nin: categories.map((c) => c._id) });
      }
    }
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
