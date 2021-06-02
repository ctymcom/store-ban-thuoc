import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllProduct(q: QueryGetListInput): ProductPageData
    getOneProduct(id: ID!): Product
    # Add Query
  }

  type Product {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã vật tư"
    code: String
    "Tên vật tư"
    name: String
    "Mã Nhóm vật tư"
    categoryIds: [ID]
    "Mã barcode"
    barcode: String
    "Xuất xứ"
    origin: String
    "Mã thành phân hoạt chất"
    ingredientIds: [ID]
    "Quy cách đóng gói"
    packing: String
    "Dạng bào chế"
    dosageForms: String
    "Kháng sinh"
    antibiotic: String
    "Công dụng"
    uses: String
    "Chỉ định"
    indications: String
    "Cách dùng"
    howToUse: String
    "Chống chỉ định"
    contraindicated: String
    "Tương tác thuốc"
    interactions: String
    "Tác dụng phụ"
    sideEffects: String
    "Thận trọng"
    careful: String
    "Quá liều"
    overdose: String
    "Bảo quản"
    preservation: String
    "Thể tích"
    volume: Float
    "Trọng lượng"
    weight: Float
    "Màu sắc"
    color: String
    "Kích cỡ"
    size: String
    "Đơn vị"
    unitCode: String
    "Đơn vị"
    unit: String
    "Mô tả"
    description: String
    "Nhóm sản phẩm BYT"
    byt: String
    "Mã hình ảnh"
    imageId: String
    "Danh sách hình ảnh"
    imageIds: [String]
    "Giá trước khi giảm"
    basePrice: Float
    "Giá bán đã giảm"
    salePrice: Float
    "Tỷ lệ chiết khấu %"
    saleRate: Float
    "Ngày hiệu lực chiêt khấu"
    saleExpiredDate: DateTime
    "Ngày hiệu lực chiêt khấu"
    saleExpiredDate1: DateTime
    "Ngày hiệu lực chiêt khấu"
    saleExpiredDate2: DateTime
    "Nhóm sản phẩm hiển thị trang chủ"
    containers: [String]
    "Danh sách tag"
    tags: [String]
    "Ngày hết hạn sử dụng"
    outOfDate: DateTime
    "Lượt xem"
    viewCount: Int
    "Lượt mua"
    saleCount: Int
    "Đánh giá gía cao"
    highPriceCount: Int
    "Đánh giá gía thấp"
    lowPriceCount: Int
    "Ngày động bộ gần nhất"
    syncAt: DateTime
    "Tỉ lệ tăng giá"
    upRate: Float
    "Tỉ lệ hạ giá"
    downRate: Float
    "Tên URL"
    slug: String
    "Tên ngắn"
    shortDescription: String

    categories: [Category]
    ingredients: [Ingredient]
    image: String
    imageS: String
    imageM: String
    imageL: String
  }

  type ProductPageData {
    data: [Product]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
