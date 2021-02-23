import { Schema } from "mongoose";

export type ProductTabContent = {
  name?: string; // Tên tiếng việt
  name2?: string; // Tên tiếng anh
  field?: string; // Trường dữ liệu
  content?: string; // Nội dung
};

export const ProductTabContentSchema = new Schema({
  name: { type: String, required: true },
  name2: { type: String, required: true },
  field: { type: String, required: true },
  content: { type: String, required: true },
});
