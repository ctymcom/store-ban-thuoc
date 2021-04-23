import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IProductCountry = BaseDocument & {
  code?: string; // Mã quốc gia
  name?: string; // Tên quốc gia
  name2?: string; // Tên quốc gia tiếng anh
};

const productCountrySchema = new Schema(
  {
    code: { type: String, require: true },
    name: { type: String, require: true },
    name2: { type: String },
  },
  { timestamps: true }
);

productCountrySchema.index({ code: 1 }, { unique: true });
// productCountrySchema.index({ name: "text" }, { weights: { name: 2 } });

export const ProductCountryHook = new ModelHook<IProductCountry>(productCountrySchema);
export const ProductCountryModel: mongoose.Model<IProductCountry> = MainConnection.model(
  "ProductCountry",
  productCountrySchema
);

export const ProductCountryLoader = ModelLoader<IProductCountry>(
  ProductCountryModel,
  ProductCountryHook
);
