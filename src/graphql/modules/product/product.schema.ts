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

    categories?: [Category];
    ingredients?: [Ingredient];
  }

  type ProductPageData {
    data: [Product]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
