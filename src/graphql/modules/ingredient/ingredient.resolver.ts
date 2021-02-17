import { Context } from "../../context";
import { ingredientService } from "./ingredient.service";

const Query = {
  getAllIngredient: async (root: any, args: any, context: Context) => {
    return ingredientService.fetch(args.q);
  },
  getOneIngredient: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await ingredientService.findOne({ _id: id });
  },
};

const Ingredient = {};

export default {
  Query,
  Ingredient,
};
