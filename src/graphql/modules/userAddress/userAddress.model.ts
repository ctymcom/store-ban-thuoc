import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IUserAddress = BaseDocument & {
  userId?: string; // Mã người dùng
  addressId?: string; // Mã địa chỉ
  fullAddress?: string; // Tên địa chỉ đầy đủ
  contactName?: string; // Tên liên hệ
  address?: string; // Số nhà tên đường
  provinceId?: string; // Tỉnh / thành giao
  districtId?: string; // Quận / huyện giao
  wardId?: string; // Phường / xã giao
  phone?: string; // string
  location?: string; // Tạo độ
  isDefault?: boolean; // Địa chỉ mặc định
};

const userAddressSchema = new Schema(
  {
    userId: { type: String, required: true },
    addressId: { type: String, required: true },
    fullAddress: { type: String, required: true },
    contactName: { type: String, required: true },
    address: { type: String, required: true },
    provinceId: { type: String, required: true },
    districtId: { type: String, required: true },
    wardId: { type: String },
    phone: { type: String },
    location: { type: String },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userAddressSchema.index({ fullAddress: "text" }, { weights: { fullAddress: 2 } });

export const UserAddressHook = new ModelHook<IUserAddress>(userAddressSchema);
export const UserAddressModel: mongoose.Model<IUserAddress> = MainConnection.model(
  "UserAddress",
  userAddressSchema
);

export const UserAddressLoader = ModelLoader<IUserAddress>(UserAddressModel, UserAddressHook);
