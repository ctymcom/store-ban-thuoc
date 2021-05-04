import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IPromotion = BaseDocument & {
  code?: string; // Mã khuyến mãi
  name?: string; // Tên khuyến mãi
  description?: string; // Mô tả
  syncAt?: Date;
};

const promotionSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    syncAt: { type: Date },
  },
  { timestamps: true }
);

promotionSchema.index({ code: "text" }, { weights: { code: 2 } });

export const PromotionHook = new ModelHook<IPromotion>(promotionSchema);
export const PromotionModel: mongoose.Model<IPromotion> = MainConnection.model(
  "Promotion",
  promotionSchema
);

export const PromotionLoader = ModelLoader<IPromotion>(PromotionModel, PromotionHook);
