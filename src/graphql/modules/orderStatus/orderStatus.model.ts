import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IOrderStatus = BaseDocument & {
  code?: number; // Mã trạng thái
  name?: string; // Tên trạng thái
  name2?: string; // Tên trạng thái tiếng anh
  position?: number; // Thứ tự
};

const orderStatusSchema = new Schema(
  {
    code: { type: Number, required: true },
    name: { type: String, required: true },
    name2: { type: String, required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

orderStatusSchema.index({ code: "text", name: "text" }, { weights: { name: 2, code: 2 } });

export const OrderStatusHook = new ModelHook<IOrderStatus>(orderStatusSchema);
export const OrderStatusModel: mongoose.Model<IOrderStatus> = MainConnection.model(
  "OrderStatus",
  orderStatusSchema
);

export const OrderStatusLoader = ModelLoader<IOrderStatus>(OrderStatusModel, OrderStatusHook);
