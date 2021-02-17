import { Context } from "../../context";
import { categoryService } from "./category.service";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { CategoryLoader } from "./category.model";

const Query = {
  getAllCategory: async (root: any, args: any, context: Context) => {
    return categoryService.fetch(args.q);
  },
  getOneCategory: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await categoryService.findOne({ _id: id });
  },
};

const Category = {
  parents: GraphQLHelper.loadManyById(CategoryLoader, "parentIds"),
};

export default {
  Query,
  Category,
};
