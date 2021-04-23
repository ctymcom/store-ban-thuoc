import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { productCountryService } from "./productCountry.service";

const Query = {
  getAllProductCountry: async (root: any, args: any, context: Context) => {
    return productCountryService.fetch(args.q);
  },
};

const ProductCountry = {};

export default {
  Query,
  ProductCountry,
};
