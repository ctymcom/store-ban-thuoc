import { Schema } from "mongoose";
import { BaseDocument } from "../../../../base/baseModel";

export enum FormFieldType {
  text = "text", // Kiểm chuỗi
  tel = "tel", // Kiểu điện thoại
  email = "email", // Kiểu email
  number = "number", // Kiểu số
  boolean = "boolean", // Kiểu boolean
  select = "select", // Kiểu lựa chọn
  address = "address", // Địa chỉ
  datetime = "datetime-local", // Kiểu ngày giờ
  date = "date", // Kiểu chọn ngày
  time = "time", // Kiểu chọn giờ
}
export type FormField = BaseDocument & {
  key?: string; // Từ khoá
  label?: string; // Nhãn hiển thị
  placeholder?: string; // Gợi ý
  type?: FormFieldType; // Loại field
  required?: boolean; // bắt buộc nhập
  default?: any; // Giá trị mặc định
  options?: string[]; // Giá trị tuỳ chọn dành chi select
  districtKey?: string; // Từ khoá quận / huyện
  wardKey?: string; // Từ khoá phường / xã
  requiredDistrict?: boolean; // Bắt buộc nhập quận / huyện
  requiredWard?: boolean; // Bắt buộc nhập phường / xã
  districtLabel?: string; // Nhãn quận / huyện
  wardLabel?: string; // Nhãn phường / xã
};

export const FormFieldSchema = new Schema({
  key: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String },
  type: { type: String, enum: Object.values(FormFieldType), default: FormFieldType.text },
  required: { type: Boolean, default: false },
  default: { type: Schema.Types.Mixed },
  options: { type: [String] },
  districtKey: { type: String },
  wardKey: { type: String },
  requiredDistrict: { type: Boolean, default: false },
  requiredWard: { type: Boolean, default: false },
  districtLabel: { type: String },
  wardLabel: { type: String },
});
