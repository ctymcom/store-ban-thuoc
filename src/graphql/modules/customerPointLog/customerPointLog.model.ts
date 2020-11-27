import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;
export enum CustomerPointLogType {
  RECEIVE_FROM_ORDER = "RECEIVE_FROM_ORDER", // Nhận từ đơn hàng
}
export type ICustomerPointLog = BaseDocument & {
  customerId?: string; // Mã thành viên
  value?: number; // Giá trị
  type?: CustomerPointLogType; // Loại sự kiện
  orderId?: string; // Mã đơn hàng
};

const customerPointLogSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    value: { type: Number, required: true },
    type: { type: String, enum: Object.values(CustomerPointLogType) },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);
customerPointLogSchema.index({ customerId: 1 });
// customerPointLogSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CustomerPointLogHook = new ModelHook<ICustomerPointLog>(customerPointLogSchema);
export const CustomerPointLogModel: mongoose.Model<ICustomerPointLog> = MainConnection.model(
  "CustomerPointLog",
  customerPointLogSchema
);

export const CustomerPointLogLoader = ModelLoader<ICustomerPointLog>(
  CustomerPointLogModel,
  CustomerPointLogHook
);
