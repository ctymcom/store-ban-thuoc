import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IDeliveryMethod = BaseDocument & {
  code?: string; // Mã vận chuyển
  name?: string; // Tên vận chuyển
  name2?: string; // Tên tiếng anh
  discountRate?: number; // Tỷ lệ chiết khấu
  position?: number; // Thứ tự
};

const deliveryMethodSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    name2: { type: String, required: true },
    discountRate: { type: Number, required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

// deliveryMethodSchema.index({ name: "text" }, { weights: { name: 2 } });

export const DeliveryMethodHook = new ModelHook<IDeliveryMethod>(deliveryMethodSchema);
export const DeliveryMethodModel: mongoose.Model<IDeliveryMethod> = MainConnection.model(
  "DeliveryMethod",
  deliveryMethodSchema
);

export const DeliveryMethodLoader = ModelLoader<IDeliveryMethod>(
  DeliveryMethodModel,
  DeliveryMethodHook
);
