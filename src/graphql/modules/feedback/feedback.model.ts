import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IFeedback = BaseDocument & {
  name?: string; // Tên người phản hồi
  title?: string; // Tiêu đề phản hồi
  avatar?: string; // Hình đại diện
  content?: string; // Nội dung phản hồi
  priority?: number; // Độ ưu tiên
};

const feedbackSchema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    avatar: { type: String, required: true },
    content: { type: String, required: true },
    priority: { type: Number, default: 0 },
  },
  { timestamps: true }
);

feedbackSchema.index({ name: "text" }, { weights: { name: 2 } });

export const FeedbackHook = new ModelHook<IFeedback>(feedbackSchema);
export const FeedbackModel: mongoose.Model<IFeedback> = MainConnection.model(
  "Feedback",
  feedbackSchema
);

export const FeedbackLoader = ModelLoader<IFeedback>(FeedbackModel, FeedbackHook);
