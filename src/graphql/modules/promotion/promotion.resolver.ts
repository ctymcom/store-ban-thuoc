import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { promotionService } from "./promotion.service";

const Query = {
  getAllPromotion: async (root: any, args: any, context: Context) => {
    return promotionService.fetch(args.q);
  },
  getOnePromotion: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await promotionService.findOne({ _id: id });
  },
};

const Promotion = {};

export default {
  Query,
  Promotion,
};
