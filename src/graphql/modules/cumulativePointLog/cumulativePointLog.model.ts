import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;
export enum CumulativePointLogType {
  RECEIVE_FROM_ORDER = "RECEIVE_FROM_ORDER", // Nhận từ đơn hàng
  RECEIVE_FROM_INVITE = "RECEIVE_FROM_INVITE", // Nhận từ mời thành viên
}
export type ICumulativePointLog = BaseDocument & {
  memberId?: string; // Mã thành viên
  value?: number; // Giá trị
  type?: CumulativePointLogType; // Loại sự kiện
  orderId?: string; // Mã đơn hàng
  fromMemberId?: string; // Mã thành viên được giới thiệu
};

const cumulativePointLogSchema = new Schema(
  {
    memberId: { type: Schema.Types.ObjectId, ref: "Member" },
    value: { type: String },
    type: { type: String },
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    fromMemberId: { type: Schema.Types.ObjectId, ref: "Member" },
  },
  { timestamps: true }
);
cumulativePointLogSchema.index({ memberId: 1 });
// cumulativePointLogSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CumulativePointLogHook = new ModelHook<ICumulativePointLog>(cumulativePointLogSchema);
export const CumulativePointLogModel: mongoose.Model<ICumulativePointLog> = MainConnection.model(
  "CumulativePointLog",
  cumulativePointLogSchema
);

export const CumulativePointLogLoader = ModelLoader<ICumulativePointLog>(
  CumulativePointLogModel,
  CumulativePointLogHook
);
