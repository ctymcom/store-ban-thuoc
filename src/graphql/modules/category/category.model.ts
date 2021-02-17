import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;
export enum CategoryType {
  VT1 = "VT1",
  VT2 = "VT2",
  VT3 = "VT3",
}
export type ICategory = BaseDocument & {
  type?: CategoryType; // Loại nhóm
  code?: string; // Mã nhóm
  name?: string; // Tên nhóm
  parentIds?: string[]; // Nhóm cha
};

const categorySchema = new Schema(
  {
    type: { type: String, enum: Object.values(CategoryType), required: true },
    code: { type: String, required: true },
    name: { type: String, required: true },
    parentIds: { type: [{ type: Schema.Types.ObjectId, ref: "Category" }], default: [] },
  },
  { timestamps: true }
);

categorySchema.index({ name: "text", code: "text" }, { weights: { name: 4, code: 2 } });

export const CategoryHook = new ModelHook<ICategory>(categorySchema);
export const CategoryModel: mongoose.Model<ICategory> = MainConnection.model(
  "Category",
  categorySchema
);

export const CategoryLoader = ModelLoader<ICategory>(CategoryModel, CategoryHook);
