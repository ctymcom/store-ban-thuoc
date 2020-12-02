import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IOrderItem = BaseDocument & {
  orderId?: string; // Mã đơn hàng
  sellerId?: string; // Mã người bán
  buyerId?: string; // Mã người mua
  isPirmary?: boolean; // Sản phẩm chính của Mobifone
  productId?: string; //  Sản phẩm
  productName?: string; //  Tên sản phẩm
  basePrice?: number; //  Giá bán
  qty?: number; //  Số lượng
  commission0?: number; //  Hoa hồng Mobifone
  commission1?: number; //  Hoa hồng điểm bán
  commission2?: number; //  Hoa hồng giới thiệu
  sellerBonusPoint?: number; //  Điểm thường người bán
  buyerBonusPoint?: number; //  Điểm thưởng người mua
};

const orderItemSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    sellerId: { type: Schema.Types.ObjectId, ref: "Member" },
    buyerId: { type: Schema.Types.ObjectId, ref: "Customer" },
    isPirmary: { type: Boolean, default: false },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    productName: { type: String, required: true },
    basePrice: { type: Number, default: 0, min: 0 },
    qty: { type: String, min: 1, required: true },
    commission0: { type: Number, default: 0, min: 0 },
    commission1: { type: Number, default: 0, min: 0 },
    commission2: { type: Number, default: 0, min: 0 },
    sellerBonusPoint: { type: Number, default: 0, min: 0 },
    buyerBonusPoint: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

// orderItemSchema.index({ name: "text" }, { weights: { name: 2 } });

export const OrderItemHook = new ModelHook<IOrderItem>(orderItemSchema);
export const OrderItemModel: mongoose.Model<IOrderItem> = MainConnection.model(
  "OrderItem",
  orderItemSchema
);

export const OrderItemLoader = ModelLoader<IOrderItem>(OrderItemModel, OrderItemHook);
