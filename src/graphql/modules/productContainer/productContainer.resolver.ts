import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
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

const ProductContainer = {};

export default {
  Query,
  ProductContainer,
};
