import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { exampleService } from "./example.service";

const Query = {
  getAllExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    return exampleService.fetch(args.q);
  },
  getOneExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    const { id } = args;
    return await exampleService.findOne({ _id: id });
  },
};

const Mutation = {
  createExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { data } = args;
    return await exampleService.create(data);
  },
  updateExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id, data } = args;
    return await exampleService.updateOne(id, data);
  },
  deleteOneExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { id } = args;
    return await exampleService.deleteOne(id);
  },
  deleteManyExample: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await exampleService.deleteMany(ids);
    return result;
  },
};

const Example = {
  example: async (root: any, args: any, context: Context) => {
    return await exampleService.model.findOne({ _id: root["exampleId"] });
  },
};

export default {
  Query,
  Mutation,
  Example,
};
