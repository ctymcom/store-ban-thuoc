import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type INotification = BaseDocument & {
  userId?: number; // Mã người dùng
  code?: number; // Mã thông báo
  title?: string; // Tiêu đề
  content?: string; // Nội dung thông báo
  link?: string; // Đường dẫn liên kết
};

const notificationSchema = new Schema(
  {
    userId: { type: Number, required: true },
    code: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    link: { type: String },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1 });
// notificationSchema.index({ name: "text" }, { weights: { name: 2 } });

export const NotificationHook = new ModelHook<INotification>(notificationSchema);
export const NotificationModel: mongoose.Model<INotification> = MainConnection.model(
  "Notification",
  notificationSchema
);

export const NotificationLoader = ModelLoader<INotification>(NotificationModel, NotificationHook);
