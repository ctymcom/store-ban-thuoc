import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { paymentMethodService } from "./paymentMethod.service";

const Query = {
  getAllPaymentMethod: async (root: any, args: any, context: Context) => {
    return paymentMethodService.fetch(args.q);
  },
  getOnePaymentMethod: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await paymentMethodService.findOne({ _id: id });
  },
};

const PaymentMethod = {};

export default {
  Query,
  PaymentMethod,
};
