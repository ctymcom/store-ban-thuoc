import { Schema } from "mongoose";

export type ProductGroupPrice = {
  customerGroup?: string; // Nhóm khách hàng
  expiredAt?: Date; // Ngày hiệu lục tới
  basePrice?: number; // Giá trước khi chiết khấu
  salePrice?: number; // Giá bán
  saleRate?: number; // Tỷ lệ chiết khấu %
};

export const ProductGroupPriceSchema = new Schema({
  customerGroup: { type: String, required: true },
  expiredAt: { type: Date },
  basePrice: { type: Number, default: 0 },
  salePrice: { type: Number, default: 0 },
  saleRate: { type: Number },
});
