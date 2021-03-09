import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IProductComment = BaseDocument & {
  code?: string; // Mã bình luận
  productId?: string; // Mã sản phẩm
  productCode?: string; // Mã sản phẩm tham chiếu
  imark?: number; // điểm đánh giá
  content?: string; // nội dung đánh giá
  reviewer?: string; // người đánh giá
};

const productCommentSchema = new Schema(
  {
    code: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productCode: { type: String, required: true },
    imark: { type: Number, required: true },
    content: { type: String, required: true },
    reviewer: { type: String, required: true },
  },
  { timestamps: true }
);

productCommentSchema.index({ productId: 1 });
// productCommentSchema.index({ name: "text" }, { weights: { name: 2 } });

export const ProductCommentHook = new ModelHook<IProductComment>(productCommentSchema);
export const ProductCommentModel: mongoose.Model<IProductComment> = MainConnection.model(
  "ProductComment",
  productCommentSchema
);

export const ProductCommentLoader = ModelLoader<IProductComment>(
  ProductCommentModel,
  ProductCommentHook
);
