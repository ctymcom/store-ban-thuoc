import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IFormData = BaseDocument & {
  formId?: string; // Mã form
  ua?: string; // User-Agent
  ip?: string; // IP gửi
  cookie?: string; // Mã định danh
  data?: any; // Dữ liệu
};

const formDataSchema = new Schema(
  {
    formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    ua: { type: String },
    ip: { type: String },
    cookie: { type: String },
    data: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

// formDataSchema.index({ name: "text" }, { weights: { name: 2 } });
formDataSchema.index({ formId: 1 });
formDataSchema.index({ cookie: 1 });

export const FormDataHook = new ModelHook<IFormData>(formDataSchema);
export const FormDataModel: mongoose.Model<IFormData> = MainConnection.model(
  "FormData",
  formDataSchema
);

export const FormDataLoader = ModelLoader<IFormData>(FormDataModel, FormDataHook);
