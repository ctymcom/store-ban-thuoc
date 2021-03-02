import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { aritoOptionService } from "./aritoOption.service";

const Query = {
  getAllAritoOption: async (root: any, args: any, context: Context) => {
    return aritoOptionService.fetch(args.q);
  },
  getOneAritoOption: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await aritoOptionService.findOne({ _id: id });
  },
};

const AritoOption = {};

export default {
  Query,
  AritoOption,
};
