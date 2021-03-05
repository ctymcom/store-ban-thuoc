import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IProductContainer = BaseDocument & {
  code?: number; // Mã nhóm
  name?: string; // Tên nhóm
  name2?: string; // Tên nhóm tiếng việt
  tagCode?: string; // Mã tag
  note?: string; // Ghi chú
  position?: number; // vị trí
  productIds?: string[]; // Danh sách sản phẩm
};

const productContainerSchema = new Schema(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
    name2: { type: String, required: true },
    tagCode: { type: String },
    note: { type: String },
    position: { type: Number },
    productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

productContainerSchema.index({ name: "text" }, { weights: { name: 2 } });

export const ProductContainerHook = new ModelHook<IProductContainer>(productContainerSchema);
export const ProductContainerModel: mongoose.Model<IProductContainer> = MainConnection.model(
  "ProductContainer",
  productContainerSchema
);

export const ProductContainerLoader = ModelLoader<IProductContainer>(
  ProductContainerModel,
  ProductContainerHook
);
