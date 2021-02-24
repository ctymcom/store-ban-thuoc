import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type ICartItem = BaseDocument & {
  productId?: string; // Mã sản phẩm
  qty?: number; // Số lượng
  price?: number; // Giá bán
  amount?: number; // Thành tiền
};

const cartItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    qty: { type: Number, default: 1 },
    price: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// cartItemSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CartItemHook = new ModelHook<ICartItem>(cartItemSchema);
export const CartItemModel: mongoose.Model<ICartItem> = MainConnection.model(
  "CartItem",
  cartItemSchema
);

export const CartItemLoader = ModelLoader<ICartItem>(CartItemModel, CartItemHook);
