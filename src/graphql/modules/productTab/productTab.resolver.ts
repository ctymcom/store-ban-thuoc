import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { productTabService } from "./productTab.service";

const Query = {
  getAllProductTab: async (root: any, args: any, context: Context) => {
    return productTabService.fetch(args.q);
  },
  getOneProductTab: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await productTabService.findOne({ _id: id });
  },
};

const ProductTab = {};

export default {
  Query,
  ProductTab,
};
