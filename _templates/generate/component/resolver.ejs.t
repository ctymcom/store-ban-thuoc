---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.resolver.ts
---
import _ from "lodash";

import { Context } from "../../context";
import { <%= h.inflection.camelize(name, true) %>Controller } from "./<%= h.inflection.camelize(name, true) %>.controller";
import { ParseQueryHelper } from "../../../helpers";

const Query = {
  getAll<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
    let queryOptions = ParseQueryHelper.parseGetList(
      args.q,
      <%= h.inflection.camelize(name, true) %>Controller.model.tableName
    );

    queryOptions.raw = true;
    let [records, total] = await Promise.all([
      <%= h.inflection.camelize(name, true) %>Controller.findAll(queryOptions),
      <%= h.inflection.camelize(name, true) %>Controller.count(queryOptions),
    ]);

    return {
      data: records,
      total: total,
      pagination: (queryOptions as any).pagination,
    };
  },
  getOne<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await <%= h.inflection.camelize(name, true) %>Controller.findOne({ where: { id } });
  },
};

const Mutation = {
  create<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
    const { data } = args;
    return await <%= h.inflection.camelize(name, true) %>Controller.create(data);
  },
  update<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
    const { id, data } = args;
    return await <%= h.inflection.camelize(name, true) %>Controller.updateOne(id, data);
  },
  deleteOne<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await <%= h.inflection.camelize(name, true) %>Controller.deleteOne(id);
  },
  deleteMany<%= h.inflection.camelize(name) %>: async (root: any, args: any, context: Context) => {
    const { ids } = args;
    let result = await <%= h.inflection.camelize(name, true) %>Controller.deleteMany(ids);
    return result;
  },
};

const <%= h.inflection.camelize(name) %> = {};

export default {
  Query,
  Mutation,
  <%= h.inflection.camelize(name) %>,
};