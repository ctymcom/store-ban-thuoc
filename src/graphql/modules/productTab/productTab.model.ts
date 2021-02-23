import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IProductTab = BaseDocument & {
  code?: string; // Mã tab
  name?: string; // Tên tiếng việt
  name2?: string; // Tên tiếng anh
  productField?: string; // Tên field láy dữ liệu
};

const productTabSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    name2: { type: String, required: true },
    productField: { type: String, required: true },
  },
  { timestamps: true }
);

productTabSchema.index({ name: "text", name2: "text" }, { weights: { name: 2, name2: 2 } });

export const ProductTabHook = new ModelHook<IProductTab>(productTabSchema);
export const ProductTabModel: mongoose.Model<IProductTab> = MainConnection.model(
  "ProductTab",
  productTabSchema
);

export const ProductTabLoader = ModelLoader<IProductTab>(ProductTabModel, ProductTabHook);
