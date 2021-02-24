import { Schema } from "mongoose";

export type ProductTagDetail = {
  code?: string; // Mã tag
  name?: string; // Tên tag
  name2?: string; // Tên tiếng anh
  color?: string; // Màu sắc
  icon?: string; // Mã icon
  outOfDate?: Date;
};

export const ProductTagDetailSchema = new Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  name2: { type: String, required: true },
  color: { type: String },
  icon: { type: String },
  position: { type: Number, default: 0 },
  outOfDate: { type: Date },
});
