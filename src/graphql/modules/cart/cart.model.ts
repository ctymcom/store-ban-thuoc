import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
import { CartItem, CartItemSchema } from "./types/cartItem.type";
const Schema = mongoose.Schema;

export type ICart = BaseDocument & {
  userId?: string; // Mã người dùng
  items?: CartItem[]; // Danh sách sản phẩm cart
};

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    items: [{ type: CartItemSchema }],
  },
  { timestamps: true }
);

cartSchema.index({ userId: 1 });
// cartSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CartHook = new ModelHook<ICart>(cartSchema);
export const CartModel: mongoose.Model<ICart> = MainConnection.model("Cart", cartSchema);

export const CartLoader = ModelLoader<ICart>(CartModel, CartHook);
