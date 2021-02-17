import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IIngredient = BaseDocument & {
  code?: string; // Mã hoạt chất
  name?: string; // Tên hoạt chất
};

const ingredientSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true }
);

ingredientSchema.index({ name: "text", code: "text" }, { weights: { name: 4, code: 2 } });

export const IngredientHook = new ModelHook<IIngredient>(ingredientSchema);
export const IngredientModel: mongoose.Model<IIngredient> = MainConnection.model(
  "Ingredient",
  ingredientSchema
);

export const IngredientLoader = ModelLoader<IIngredient>(IngredientModel, IngredientHook);
