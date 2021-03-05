import { Schema } from "mongoose";

export type CartItem = {
  userId?: string; // Mã người dùng
  productId?: string; // Mã sản phẩm
  productCode?: string;
  unit?: string; // Đơn vị
  qty?: number; // Số lượng
  price?: number; // Giá bán
  amount?: number; // Thành tiền
};

export const CartItemSchema = new Schema({
  userId: { type: String, required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productCode: { type: String, required: true },
  unit: { type: String, required: true },
  qty: { type: Number, default: 1 },
  price: { type: Number, default: 0 },
  amount: { type: Number, default: 0 },
});
