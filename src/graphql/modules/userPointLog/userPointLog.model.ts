import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IUserPointLog = BaseDocument & {
  userId?: string; // Mã người dùng
  code?: number; // Mã log
  reasonCode?: string; // Mã lý do
  note?: string; // Ghi chú
  note2: string; // Ghi chú tiếng anh
  status?: number; // Trạng thái
  value?: number; // Giá trị
  convertedValue?: number; // Tiền chuyển đổi
};

const userPointLogSchema = new Schema(
  {
    userId: { type: String, required: true },
    code: { type: Number, required: true },
    reasonCode: { type: String, required: true },
    note: { type: String },
    note2: { type: String },
    status: { type: Number, required: true },
    value: { type: Number, required: true },
    convertedValue: { type: Number, required: true },
  },
  { timestamps: true }
);

userPointLogSchema.index({ userId: 1 });
// userPointLogSchema.index({ name: "text" }, { weights: { name: 2 } });

export const UserPointLogHook = new ModelHook<IUserPointLog>(userPointLogSchema);
export const UserPointLogModel: mongoose.Model<IUserPointLog> = MainConnection.model(
  "UserPointLog",
  userPointLogSchema
);

export const UserPointLogLoader = ModelLoader<IUserPointLog>(UserPointLogModel, UserPointLogHook);
