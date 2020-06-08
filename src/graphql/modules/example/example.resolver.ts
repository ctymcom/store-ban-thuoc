import _ from "lodash";

import { Context } from "../../context";

const Query = {
  getAllSetting:  (root: any, args: any, context: Context) => {
    return [{ id: "1", code: "String" }];
  },
};

const Mutation = {};

const Setting = {};

export default {
  Query,
  Mutation,
  Setting,
};
