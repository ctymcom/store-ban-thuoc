import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;
export enum ProductType {
  RETAIL = "RETAIL", // Sản phẩm bán lẻ
  SMS = "SMS", // Dịch vụ SMS
  SERVICE = "SERVICE", // Dịch vụ Khác
}
export type IProduct = BaseDocument & {
  code?: string; // Mã sản phẩm
  name?: string; // Tên sản phẩm
  isPrimary?: boolean; // Sản phẩm chính
  isCrossSale?: boolean; // Sản phẩm bán chéo
  crossScaleInventory?: number; // Tồn kho bán chéo
  type?: ProductType; // Loại sản phẩm
  basePrice?: number; // Gía bán
  subtitle?: string; // Mô tả ngắn
  intro?: string; // Giới thiệu sản phẩm
  image?: string; // Hình ảnh đại diện
  commission0?: number; // Hoa hồng Mobifone
  commission1?: number; // Hoa hồng điểm bán
  commission2?: number; // Hoa hồng giới thiệu
  enabledMemberBonus?: boolean; // Thưởng cho điểm bán
  enabledCustomerBonus?: boolean; // Thưởng cho khách hàng
  memberBonusFactor?: number; // Hệ số thưởng điểm bán
  customerBonusFactor?: number; // Hệ số thưởng khách hàng
  categoryId?: string; // Danh mục sản phẩm
  smsSyntax?: string; // Cú pháp SMS
  smsPhone?: string; // SMS tới số điện thoại
  allowSale?: boolean; // Mở bán
  memberId?: string; // Mã thành viên quản lý sản phẩm
};

const productSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    isPrimary: { type: Boolean, default: false },
    isCrossSale: { type: String, default: false },
    crossScaleInventory: { type: Number, default: 0 },
    type: { type: String, enum: Object.values(ProductType), default: ProductType.RETAIL },
    basePrice: { type: Number, default: 0 },
    subtitle: { type: String },
    intro: { type: String },
    image: { type: String },
    commission0: { type: Number, default: 0 },
    commission1: { type: Number, default: 0 },
    commission2: { type: Number, default: 0 },
    enabledMemberBonus: { type: Boolean, default: false },
    enabledCustomerBonus: { type: Boolean, default: false },
    memberBonusFactor: { type: Number, default: 1 },
    customerBonusFactor: { type: Number, default: 1 },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    smsSyntax: { type: String },
    smsPhone: { type: String },
    allowSale: { type: Boolean, default: true },
    memberId: { type: Schema.Types.ObjectId, ref: "Member" },
  },
  { timestamps: true }
);

productSchema.index({ memberId: 1 });
// productSchema.index({ name: "text" }, { weights: { name: 2 } });

export const ProductHook = new ModelHook<IProduct>(productSchema);
export const ProductModel: mongoose.Model<IProduct> = MainConnection.model(
  "Product",
  productSchema
);

export const ProductLoader = ModelLoader<IProduct>(ProductModel, ProductHook);
