import _ from "lodash";

import { Context } from "../../context";
import { exampleService } from "./example.service";
import { ParseQueryHelper, AuthHelper } from "../../../helpers";
import { ROLES } from "../../../constants/role.const";
import { ExampleModel } from "./example.model";
import { exampleEvent } from "../../../events/example.event";

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
    return await ExampleModel.findOne({ _id: root["exampleId"] });
  },
};

export default {
  Query,
  Mutation,
  Example,
};
