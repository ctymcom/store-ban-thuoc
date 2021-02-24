import { Context } from "../../context";
import { productTagService } from "./productTag.service";

const Query = {
  getAllProductTag: async (root: any, args: any, context: Context) => {
    return productTagService.fetch(args.q);
  },
  getOneProductTag: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await productTagService.findOne({ _id: id });
  },
};

const ProductTag = {};

export default {
  Query,
  ProductTag,
};
