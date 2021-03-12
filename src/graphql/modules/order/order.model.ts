import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
import { OrderItem, OrderItemSchema } from "./types/orderItem.schema";
const Schema = mongoose.Schema;

export type IOrder = BaseDocument & {
  userId?: string; // Mã người dùng
  code?: number; // Mã đơn hàng
  orderNumber?: string; // Mã chứng từ
  addressId?: string; // Mã địa chỉ
  fullAddress?: string; // Tên địa chỉ đầy đủ
  contactName?: string; // Tên liên hệ
  address?: string; // Số nhà tên đường
  provinceId?: string; // Tỉnh / thành giao
  districtId?: string; // Quận / huyện giao
  wardId?: string; // Phường / xã giao
  phone?: string; // string
  location?: string; // Tạo độ
  items?: OrderItem[]; // Chi tiết đơn hàng
  subtotal?: number; // Tổng tiền hàng
  discount?: number; // Tiền giảm giá
  amount?: number; // Thành tiền
  promotionCode?: string; // Mã khuyến mãi
  paymentMethod?: string; // Phương thức thanh toán
  deliveryMethod?: string; // Phương thức vận chuyển
  usePoint?: boolean; // Sử dụng điểm
  status?: number; // Trạng thái đơn hàng
  itemCount?: number; // Số lượng sản phẩm
};

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    code: { type: Number, required: true },
    orderNumber: { type: String, required: true },
    addressId: { type: String, required: true },
    fullAddress: { type: String },
    contactName: { type: String },
    address: { type: String },
    provinceId: { type: String },
    districtId: { type: String },
    wardId: { type: String },
    phone: { type: String },
    location: { type: String },
    items: [OrderItemSchema],
    subtotal: { type: Number, min: 0, default: 0 },
    discount: { type: Number, min: 0, default: 0 },
    amount: { type: Number, min: 0, default: 0 },
    promotionCode: { type: String },
    paymentMethod: { type: String },
    deliveryMethod: { type: String },
    usePoint: { type: Boolean, default: false },
    status: { type: Number },
    itemCount: { type: Number, min: 0, default: 0 },
  },
  { timestamps: true }
);

orderSchema.index({ orderNumber: "text" }, { weights: { orderNumber: 2 } });
orderSchema.index({ userId: 1, status: 1 });

export const OrderHook = new ModelHook<IOrder>(orderSchema);
export const OrderModel: mongoose.Model<IOrder> = MainConnection.model("Order", orderSchema);

export const OrderLoader = ModelLoader<IOrder>(OrderModel, OrderHook);
