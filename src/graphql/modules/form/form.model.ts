import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
import { FormField, FormFieldSchema } from "./types/formField.type";
const Schema = mongoose.Schema;
export type IForm = BaseDocument & {
  name?: string; // Tên biểu mẫu
  code?: string; // Mã biểu mẫu
  title?: string; // Tiêu đề hiển thị
  fields?: FormField[]; // Danh sách các trường dữ liệu
  redirectLink?: string; // Địa chỉ điều hướng
};

const formSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    title: { type: String, required: true },
    fields: { type: [FormFieldSchema], minlength: 1, required: true },
    redirectLink: { type: String, required: true },
  },
  { timestamps: true }
);

formSchema.index({ name: "text", code: "text" }, { weights: { name: 2, text: 2 } });
formSchema.index({ code: 1 }, { unique: true });
export const FormHook = new ModelHook<IForm>(formSchema);
export const FormModel: mongoose.Model<IForm> = MainConnection.model("Form", formSchema);

export const FormLoader = ModelLoader<IForm>(FormModel, FormHook);
