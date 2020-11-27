import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IOrder = BaseDocument & {
  name?: string;
};

const orderSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// orderSchema.index({ name: "text" }, { weights: { name: 2 } });

export const OrderHook = new ModelHook<IOrder>(orderSchema);
export const OrderModel: mongoose.Model<IOrder> = MainConnection.model(
  "Order",
  orderSchema
);

export const OrderLoader = ModelLoader<IOrder>(OrderModel, OrderHook);
