import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { ExampleLoader } from "./example.model";
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
  example: GraphQLHelper.loadById(ExampleLoader, "exampleId"),
};

export default {
  Query,
  Mutation,
  Example,
};
