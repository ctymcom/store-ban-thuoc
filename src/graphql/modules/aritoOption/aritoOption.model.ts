import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IAritoOption = BaseDocument & {
  code?: string; // Mã option
  name?: string; // Tên option
  name2?: string; // Tên tiếng anh
  value?: string; // Giá trị
};

const aritoOptionSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    name2: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

aritoOptionSchema.index({ code: "text" }, { weights: { code: 2 } });

export const AritoOptionHook = new ModelHook<IAritoOption>(aritoOptionSchema);
export const AritoOptionModel: mongoose.Model<IAritoOption> = MainConnection.model(
  "AritoOption",
  aritoOptionSchema
);

export const AritoOptionLoader = ModelLoader<IAritoOption>(AritoOptionModel, AritoOptionHook);
