import { set } from "lodash";

import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";
import { promotionService } from "./promotion.service";

const Query = {
  getAllPromotion: async (root: any, args: any, context: Context) => {
    if (context.isAuth) {
      const res = await AritoHelper.getAllPromotion(1, null, context.tokenData.ref);
      const codes = res.data.map((d) => d.code);
      set(args, "q.filter.code", { $in: codes });
    }
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
