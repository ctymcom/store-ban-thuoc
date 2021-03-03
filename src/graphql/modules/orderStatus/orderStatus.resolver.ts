import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { IOrderStatus } from "./orderStatus.model";
import { orderStatusService } from "./orderStatus.service";

const Query = {
  getAllOrderStatus: async (root: any, args: any, context: Context) => {
    return orderStatusService.fetch(args.q).then((res) => {
      res.data = res.data.filter((d: IOrderStatus) => d.code != 0);
      return res;
    });
  },
  getOneOrderStatus: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await orderStatusService.findOne({ _id: id });
  },
};

const OrderStatus = {};

export default {
  Query,
  OrderStatus,
};
