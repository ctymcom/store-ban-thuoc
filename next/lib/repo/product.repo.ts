import { BaseModel, CrudRepository } from "./crud.repo";

export interface Product extends BaseModel {
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
  basePrice?: number; // Giá trước khi giảm
  salePrice?: number; // Giá bán đã giảm
  saleRate?: number; // Tỷ lệ chiết khấu %
  saleExpiredDate?: Date; // Ngày hiệu lực chiêt khấu
  saleExpiredDate1?: Date; // Ngày hiệu lực chiêt khấu
  saleExpiredDate2?: Date; // Ngày hiệu lực chiêt khấu
  containers?: string[]; // Nhóm sản phẩm hiển thị trang chủ
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
}

interface ProductTagDetail {
  code: string;
  name: string;
  name2: string;
  color: string;
  icon: string;
  position: number;
  outOfDate: string;
}

interface ProductTabContent {
  name: string;
  name2: string;
  content: string;
}

export class ProductRepository extends CrudRepository<Product> {
  apiName: string = "Product";
  shortFragment: string = this.parseFragment(`
    id: string
    createdAt: DateTime
    updatedAt: DateTime
    code: string
    name: string
    unit: string
    packing: string
    basePrice: number
    salePrice: number
    containers: [string]
    saleRate: number
    tags: [string]
    tagDetails { code name color }: [ProductTagDetail]
    categories { id name parents { id name } }: [Category]
    slug: String
    image: string
    imageS: string
    upRate: Float
    downRate: Float
  `);
  fullFragment: string = this.parseFragment(`
    id: string
    createdAt: DateTime
    updatedAt: DateTime
    code: string
    name: string
    categoryIds: [ID]
    barcode: string
    origin: string
    ingredientIds: [ID]
    packing: string
    dosageForms: string
    antibiotic: string
    uses: string
    indications: string
    howToUse: string
    contraindicated: string
    interactions: string
    sideEffects: string
    careful: string
    overdose: string
    preservation: string
    volume: number
    weight: number
    color: string
    size: string
    unitCode: string
    unit: string
    shortDescription: string
    description: string
    byt: string
    imageId: string
    basePrice: number
    salePrice: number
    containers: [string]
    saleRate: number
    slug: String
    tags: [string]
    saleExpiredDate: DateTime
    viewCount: Int
    saleCount: Int
    tagDetails {
      code: String
      name: String
      name2: String
      color: String
      icon: String
      position: Int
      outOfDate: DateTime
    }: [ProductTagDetail]
    tabs {
      name: String
      name2: String
      content: String
    }: [ProductTabContent]
    relatedProducts {
      id: string
      createdAt: DateTime
      updatedAt: DateTime
      code: string
      name: string
      unit: string
      basePrice: number
      salePrice: number
      containers: [string]
      slug: String
      saleRate: number
      tags: [string]
      tagDetails { code name }: [ProductTagDetail]
      categories { id name parents { id name } }: [Category]
      image: string
    }: [Product]
    categories { id name parents { id name } }: [Category]
    ingredients { id name }: [Ingredient]
    image: string
    imageS: string
    imageM: string
    imageL: string
    upRate: Float
    downRate: Float
  `);
}

export const ProductService = new ProductRepository();
