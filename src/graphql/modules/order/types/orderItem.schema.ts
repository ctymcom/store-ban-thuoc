import { gql } from "apollo-server-core";
import { Schema } from "mongoose";

export type OrderItem = {
  productId: string; // Mã sản phẩm
  productCode: string; // Má sản phẩm tham chiếu
  productName: string; // Tên sản phẩm
  unit: String; // Đơn vị tính
  storeCode: string; // Mã kho
  qty: number; // Số lượng
  price: number; // Gía bán
  amount: number; // Thành tiền
  factor: number; // Hệ số
  discountRate: number; // Tỷ lệ chiết khấu
  discount: number; // Chiết khấu
  vatRate: number; // % VAT
  vat: number; // Tiền VAT
  position: number; // Thứ tự
};

export const OrderItemSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  productCode: { type: String, required: true },
  productName: { type: String, required: true },
  unit: { type: String, required: true },
  storeCode: { type: String, required: true },
  qty: { type: Number, min: 0, default: 0 },
  price: { type: Number, min: 0, default: 0 },
  amount: { type: Number, min: 0, default: 0 },
  factor: { type: Number, min: 0, default: 0 },
  discountRate: { type: Number, min: 0, default: 0 },
  discount: { type: Number, min: 0, default: 0 },
  vatRate: { type: Number, min: 0, default: 0 },
  vat: { type: Number, min: 0, default: 0 },
  position: { type: Number, min: 0, default: 0 },
});

export default gql`
  type OrderItem {
    "Mã sản phẩm"
    productId: ID
    "Mã sản phẩm tham chiếu"
    productCode: String
    "Tên sản phẩm"
    productName: String
    "Đơn vị"
    unit: String
    "Mã kho"
    storeCode: String
    "Số lượng"
    qty: Int
    "Gía bán"
    price: Float
    "Thành tiền"
    amount: Float
    "Hệ số"
    factor: Float
    "Tỷ lệ chiết khấu"
    discountRate: Float
    "Chiết khấu"
    discount: Float
    "% VAT"
    vatRate: Float
    "Tiền VAT"
    vat: Float
    "Thứ tự"
    position: Int

    product: Product
  }

  input OrderItemInput {
    productId: ID
    qty: Int
  }
`;
