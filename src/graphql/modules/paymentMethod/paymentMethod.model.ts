import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IPaymentMethod = BaseDocument & {
  code?: string; // Mã thanh toán
  name?: string; // Tên thanh toán
  name2?: string; // Tên tiếng anh
  discountRate?: number; // Tỷ lệ chiết khấu
  position?: number; // Vị trí
};

const paymentMethodSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    name2: { type: String, required: true },
    discountRate: { type: Number, required: true },
    position: { type: Number, required: true },
  },
  { timestamps: true }
);

// paymentMethodSchema.index({ name: "text" }, { weights: { name: 2 } });

export const PaymentMethodHook = new ModelHook<IPaymentMethod>(paymentMethodSchema);
export const PaymentMethodModel: mongoose.Model<IPaymentMethod> = MainConnection.model(
  "PaymentMethod",
  paymentMethodSchema
);

export const PaymentMethodLoader = ModelLoader<IPaymentMethod>(
  PaymentMethodModel,
  PaymentMethodHook
);
