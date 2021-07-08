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
  ingredientNames?: string[]; // Danh sách tên hoạt chất
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
  imageIds?: string[]; // Danh sách hình ảnh
  basePrice?: number; // Giá trước khi giảm
  salePrice?: number; // Giá bán đã giảm
  saleRate?: number; // Tỷ lệ chiết khấu %
  saleExpiredDate?: Date; // Ngày hiệu lực chiêt khấu
  saleExpiredDate1?: Date; // Ngày hiệu lực chiêt khấu
  saleExpiredDate2?: Date; // Ngày hiệu lực chiêt khấu
  containers?: string[]; // Nhóm sản phẩm hiển thị trang chủ
  priceGroups?: ProductGroupPrice[]; // Bảng giá theo nhóm khách
  tags?: string[]; // Danh sách tag
  tagDetails?: ProductTagDetail[]; // Nội dung tag chi tiết
  tabs?: ProductTabContent[]; // Danh sách tab và nội dung
  outOfDate?: Date; // Ngày hết hạn sử dụng
  viewCount?: number; // Lượt xem
  saleCount?: number; // Lượt mua
  highPriceCount?: number; // Đánh giá gía cao
  lowPriceCount?: number; // Đánh giá gía thấp
  syncAt?: Date; // Ngày động bộ gần nhất
  upRate?: number; // Tỉ lệ tăng giá
  downRate?: number; // Tỉ lệ hạ giá
  slug?: string; // Tên URL
  shortDescription?: string; // Tên ngắn
  status?: number; // Trạng thái
};

const productSchema = new Schema(
  {
    code: { type: String, required: true },
    name: { type: String, required: true },
    categoryIds: { type: [{ type: Schema.Types.ObjectId, ref: "Category" }] },
    barcode: { type: String },
    origin: { type: String },
    ingredientIds: { type: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }] },
    ingredientNames: [{ type: String }],
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
    imageIds: { type: [String], default: [] },
    basePrice: { type: Number, default: 0 },
    salePrice: { type: Number, default: 0 },
    saleRate: { type: Number, default: 0 },
    saleExpiredDate: { type: Date },
    saleExpiredDate1: { type: Date },
    saleExpiredDate2: { type: Date },
    containers: { type: [String], default: [] },
    priceGroups: { type: [ProductGroupPriceSchema], default: [] },
    tags: { type: [String], default: [] },
    tagDetails: { type: [ProductTagDetailSchema], default: [] },
    tabs: { type: [ProductTabContentSchema], default: [] },
    outOfDate: { type: Date },
    viewCount: { type: Number, min: 0, default: 0 },
    saleCount: { type: Number, min: 0, default: 0 },
    highPriceCount: { type: Number, min: 0, default: 0 },
    lowPriceCount: { type: Number, min: 0, default: 0 },
    syncAt: { type: Date },
    upRate: { type: Number, default: 0 },
    downRate: { type: Number, default: 0 },
    slug: { type: String },
    shortDescription: { type: String },
    status: { type: Number },
  },
  { timestamps: true }
);

productSchema.index({ code: 1 }, { unique: true });
productSchema.index({ slug: 1 });
productSchema.index({ saleExpiredDate: 1 });
productSchema.index({ createdAt: 1 });
productSchema.index(
  { name: "text", ingredientNames: "text" },
  { weights: { name: 2, ingredientNames: 1 } }
);

export const ProductHook = new ModelHook<IProduct>(productSchema);
export const ProductModel: mongoose.Model<IProduct> = MainConnection.model(
  "Product",
  productSchema
);

export const ProductLoader = ModelLoader<IProduct>(ProductModel, ProductHook);
