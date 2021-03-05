import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
import { CartItem, CartItemSchema } from "./types/cartItem.type";
const Schema = mongoose.Schema;

export type ICart = BaseDocument & {
  userId?: string; // Mã người dùng
  itemCount?: number; // Số lượng sản phẩm
  subtotal?: number; // Tổng tiền hàng
  shipfee?: number; // Phí ship
  discount?: number; // Giảm giá
  amount?: number; // Tổng thành tiền
  shipMethod?: string; // Phương thức vận chuyển
  paymentMethod?: number; // Phương thức thanh toán
  discountId?: string; // Mã khuyến mãi
  discountName?: string; // Tên khuyến mãi
  discountRate?: number; // Tỷ lệ chiết khấu %
  usePoint?: boolean; // Sử dụng điểm đổi thưởng
  addressId?: string; // Mã địa chỉ

  items?: CartItem[]; // Danh sách sản phẩm cart
};

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    itemCount: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    shipfee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    shipMethod: { type: String },
    paymentMethod: { type: Number, default: 0 },
    discountId: { type: String },
    discountName: { type: String },
    discountRate: { type: Number, default: 0 },
    usePoint: { type: Boolean, default: false },
    addressId: { type: Schema.Types.ObjectId, ref: "UserAddress" },
    items: [{ type: CartItemSchema }],
  },
  { timestamps: true }
);

// cartSchema.index({ name: "text" }, { weights: { name: 2 } });

export const CartHook = new ModelHook<ICart>(cartSchema);
export const CartModel: mongoose.Model<ICart> = MainConnection.model("Cart", cartSchema);

export const CartLoader = ModelLoader<ICart>(CartModel, CartHook);
