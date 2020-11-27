import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;
export enum CommissionLogType {
  RECEIVE_FROM_ORDER = "RECEIVE_FROM_ORDER", // Nhận từ đơn hàng
}
export type ICommissionLog = BaseDocument & {
  memberId?: string; // Mã thành viên
  value?: number; // Giá trị
  type?: CommissionLogType; // Loại sự kiện
  orderId?: string; // Mã đơn hàng
};

const commissionLogSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member", required: true },
    value: { type: Number, required: true },
    type: { type: String, enum: Object.values(CommissionLogType), required: true },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);
commissionLogSchema.index({ memberId: 1 });
// commissionLogSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CommissionLogHook = new ModelHook<ICommissionLog>(commissionLogSchema);
export const CommissionLogModel: mongoose.Model<ICommissionLog> = MainConnection.model(
  "CommissionLog",
  commissionLogSchema
);

export const CommissionLogLoader = ModelLoader<ICommissionLog>(
  CommissionLogModel,
  CommissionLogHook
);
