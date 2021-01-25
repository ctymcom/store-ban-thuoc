import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type ITag = BaseDocument & {
  name?: string; // Tên tag
  slug?: string; // Từ khoá
  description?: string; // Mô tả
  accentColor?: string; // Mã màu
  featureImage?: string; // Hình ảnh đại diện
};

const tagSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    accentColor: { type: String },
    featureImage: { type: String },
  },
  { timestamps: true }
);

tagSchema.index({ name: "text", slug: "text" }, { weights: { name: 2, slug: 1 } });
tagSchema.index({ slug: 1 }, { unique: true });

export const TagHook = new ModelHook<ITag>(tagSchema);
export const TagModel: mongoose.Model<ITag> = MainConnection.model("Tag", tagSchema);

export const TagLoader = ModelLoader<ITag>(TagModel, TagHook);
