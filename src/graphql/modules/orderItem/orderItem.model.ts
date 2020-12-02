import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IOrderItem = BaseDocument & {
  name?: string;
};

const orderItemSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// orderItemSchema.index({ name: "text" }, { weights: { name: 2 } });

export const OrderItemHook = new ModelHook<IOrderItem>(orderItemSchema);
export const OrderItemModel: mongoose.Model<IOrderItem> = MainConnection.model(
  "OrderItem",
  orderItemSchema
);

export const OrderItemLoader = ModelLoader<IOrderItem>(OrderItemModel, OrderItemHook);
