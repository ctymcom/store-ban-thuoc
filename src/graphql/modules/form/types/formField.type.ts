import { Schema } from "mongoose";

export enum FormFieldType {
  text = "text", // Kiểm chuỗi
  tel = "tel", // Kiểu điện thoại
  email = "email", // Kiểu email
  number = "number", // Kiểu số
  boolean = "boolean", // Kiểu boolean
  select = "select", // Kiểu lựa chọn
  province = "province", // Kiểu tỉnh / thành
  district = "district", // Kiểu quận / huyện
  ward = "ward", // Kiểu phường /xã
  datetime = "datetime", // Kiểu ngày giờ
  date = "date", // Kiểu chọn ngày
  time = "time", // Kiểu chọn giờ
}
export type FormField = {
  key?: string; // Từ khoá
  label?: string; // Nhãn hiển thị
  placeholder?: string; // Gợi ý
  type?: FormFieldType; // Loại field
  required?: boolean; // bắt buộc nhập
  default?: any; // Giá trị mặc định
  options?: string[]; // Giá trị tuỳ chọn dành chi select
};

export const FormFieldSchema = new Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String },
  type: { type: String, enum: Object.values(FormFieldType), default: FormFieldType.text },
  required: { type: Boolean, default: false },
  default: { type: Schema.Types.Mixed },
  options: { type: [String] },
});
