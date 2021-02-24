import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IProductTag = BaseDocument & {
  code?: string; // Mã tag
  name?: string; // Tên tag
  name2?: string; // Tên tiếng anh
  color?: string; // Màu sắc
  icon?: string; // Mã icon
  position?: number; // Thứ tự
  showFilter?: boolean; // Hiển thị filter
};

const productTagSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    name2: { type: String, required: true },
    color: { type: String },
    icon: { type: String },
    position: { type: Number, default: 0 },
    showFilter: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// productTagSchema.index({ name: "text" }, { weights: { name: 2 } });

export const ProductTagHook = new ModelHook<IProductTag>(productTagSchema);
export const ProductTagModel: mongoose.Model<IProductTag> = MainConnection.model(
  "ProductTag",
  productTagSchema
);

export const ProductTagLoader = ModelLoader<IProductTag>(ProductTagModel, ProductTagHook);
