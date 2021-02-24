import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
import { ProductGroupPrice, ProductGroupPriceSchema } from "./types/productGroupPrice.type";
import { ProductTabContent, ProductTabContentSchema } from "./types/productTabContent.type";
import { ProductTagDetail, ProductTagDetailSchema } from "./types/productTagDetail.type";
const Schema = mongoose.Schema;

export type IProduct = BaseDocument & {
  code?: string; // Mã vật tư
  name?: string; // Tên vật tư
  categoryIds?: string[]; // Mã Nhóm vật tư
  barcode?: string; // Mã barcode
  origin?: string; // Xuất xứ
  ingredientIds?: string[]; // Mã thành phân hoạt chất
  packing?: string; // Quy cách đóng gói
  dosageForms?: string; // Dạng bào chế
  antibiotic?: string; // Kháng sinh
  uses?: string; // Công dụng
  indications?: string; // Chỉ định
  howToUse?: string; // Cách dùng
  contraindicated?: string; // Chống chỉ định
  interactions?: string; // Tương tác thuốc
  sideEffects?: string; // Tác dụng phụ
  careful?: string; // Thận trọng
  overdose?: string; // Quá liều
  preservation?: string; // Bảo quản
  volume?: number; // Thể tích
  weight?: number; // Trọng lượng
  color?: string; // Màu sắc
  size?: string; // Kích cỡ
  unitCode?: string; // Đơn vị
  unit?: string; // Đơn vị
  description?: string; // Mô tả
  byt?: string; // Nhóm sản phẩm BYT
  imageId?: string; // Mã hình ảnh
  basePrice?: number; // Giá trước khi giảm
  salePrice?: number; // Giá bán đã giảm
  saleRate?: number; // Tỷ lệ chiết khấu %
  saleExpiredDate?: Date; // Ngày hiệu lực chiêt khấu
  containers?: string[]; // Nhóm sản phẩm hiển thị trang chủ
  priceGroups?: ProductGroupPrice[]; // Bảng giá theo nhóm khách
  tags?: string[]; // Danh sách tag
  tagDetails?: ProductTagDetail[]; // Nội dung tag chi tiết
  tabs?: ProductTabContent[]; // Danh sách tab và nội dung
  outOfDate?: Date; // Ngày hết hạn sử dụng
};

const productSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    categoryIds: { type: [{ type: Schema.Types.ObjectId, ref: "Category" }] },
    barcode: { type: String },
    origin: { type: String },
    ingredientIds: { type: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }] },
    packing: { type: String },
    dosageForms: { type: String },
    antibiotic: { type: String },
    uses: { type: String },
    indications: { type: String },
    howToUse: { type: String },
    contraindicated: { type: String },
    interactions: { type: String },
    sideEffects: { type: String },
    overdose: { type: String },
    preservation: { type: String },
    volume: { type: String },
    weight: { type: String },
    color: { type: String },
    size: { type: String },
    unitCode: { type: String },
    unit: { type: String },
    description: { type: String },
    byt: { type: String },
    imageId: { type: String },
    basePrice: { type: Number, default: 0 },
    salePrice: { type: Number, default: 0 },
    containers: { type: [String], default: [] },
    priceGroups: { type: [ProductGroupPriceSchema], default: [] },
    tags: { type: [String], default: [] },
    tagDetails: { type: [ProductTagDetailSchema], default: [] },
    tabs: { type: [ProductTabContentSchema], default: [] },
    outOfDate: { type: Date },
  },
  { timestamps: true }
);

productSchema.index({ name: "text" }, { weights: { name: 2 } });

export const ProductHook = new ModelHook<IProduct>(productSchema);
export const ProductModel: mongoose.Model<IProduct> = MainConnection.model(
  "Product",
  productSchema
);

export const ProductLoader = ModelLoader<IProduct>(ProductModel, ProductHook);
