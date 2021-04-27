import { set } from "lodash";

import { SettingKey } from "../../../configs/settingData";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { CategoryModel } from "../category/category.model";
import { ProductLoader } from "../product/product.model";
import { productService } from "../product/product.service";
import { SettingHelper } from "../setting/setting.helper";
import { IProductContainer } from "./productContainer.model";
import { productContainerService } from "./productContainer.service";

const Query = {
  getAllProductContainer: async (root: any, args: any, context: Context) => {
    set(args, "q.sort", { position: 1 });
    return productContainerService.fetch(args.q);
  },
  getOneProductContainer: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await productContainerService.findOne({ _id: id });
  },
};

const ProductContainer = {
  products: async (root: IProductContainer, args: any, context: Context) => {
    const query = {
      filter: { _id: { $in: root.productIds }, salePrice: { $gt: 0 } },
      limit: args.limit,
    };
    const hiddenCategories = await SettingHelper.load(SettingKey.HIDDEN_PRODUCT_OF_CATEGORIES);
    if (hiddenCategories.length > 0) {
      const categories = await CategoryModel.find({ name: { $in: hiddenCategories } });
      if (categories.length > 0) {
        set(query, "filter.categoryIds", { $nin: categories.map((c) => c._id) });
        const res = await productService.fetch(query);
        return res.data;
      }
    }
    return await productService.fetch(query).then((res) => res.data);
  },
};

export default {
  Query,
  ProductContainer,
};
