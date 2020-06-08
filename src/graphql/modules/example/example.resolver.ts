import _ from "lodash";

import { Context } from "../../context";
import { ExampleModel } from "./example.model";
import { BaseErrorHelper } from "../../../base/error";
import { exampleController } from "./example.controller";

const Query = {
  getAllExample: async (root: any, args: any, context: Context) => {
    return await exampleController.findAll({ where: {} });
  },
  getOneExample: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await exampleController.findOne({ where: { id } });
  },
};

const Mutation = {
  createExample: async (root: any, args: any, context: Context) => {
    const { data } = args;
    return await exampleController.create(data);
  },
  updateExample: async (root: any, args: any, context: Context) => {
    const { id, data } = args;
    return await exampleController.updateOne(id, data);
  },
  deleteOneExample: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await exampleController.deleteOne(id);
  },
  deleteManyExample: async (root: any, args: any, context: Context) => {
    const { ids } = args;
    let result =  await exampleController.deleteMany(ids);
    return result;
  },
};

const Example = {};

export default {
  Query,
  Mutation,
  Example,
};
