import { Schema } from "mongoose";

export type CartItem = {
  productId?: string; // Mã sản phẩm
  productCode?: string;
  qty?: number; // Số lượng
};

export const CartItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productCode: { type: String, required: true },
  qty: { type: Number, default: 1 },
});
