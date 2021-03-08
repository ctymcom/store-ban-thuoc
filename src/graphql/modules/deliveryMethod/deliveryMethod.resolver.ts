import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { deliveryMethodService } from "./deliveryMethod.service";

const Query = {
  getAllDeliveryMethod: async (root: any, args: any, context: Context) => {
    return deliveryMethodService.fetch(args.q);
  },
  getOneDeliveryMethod: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await deliveryMethodService.findOne({ _id: id });
  },
};

const DeliveryMethod = {};

export default {
  Query,
  DeliveryMethod,
};
