import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type ICartItem = BaseDocument & {
  cartId?: string; // Mã giỏ hàng
  userId?: string; // Mã người dùng
  productId?: string; // Mã sản phẩm
  productCode?: string;
  qty?: number; // Số lượng
  price?: number; // Giá bán
  amount?: number; // Thành tiền
};

const cartItemSchema = new Schema(
  {
    cartId: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
    userId: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productCode: { type: String, required: true },
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
