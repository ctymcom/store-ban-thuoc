import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IBankAccount = BaseDocument & {
  unitID?: string; // unit_id
  account?: string; // Mã tài khoản
  bankAccount?: string; // Tên tài khoản
  accountOwner?: string; // Chủ tài khoản
  bankName?: string; // Tên ngân hàng
  bankName2?: string; // Tên ngân hàng tiếng anh
  province?: string; // Tên tỉnh/ thành
  phone?: string; // Điện thoại
  fax?: string; // Fax
  email?: string; // email
  homePage?: string; // Trang chủ
  partner?: string; // Đối tác
  taxCode?: string; // Mã Số thuế
  note?: string; // Ghi chú
  branch?: string; // Chi nhánh
};

const bankAccountSchema = new Schema(
  {
    unitID: { type: String, require: true },
    account: { type: String, require: true },
    bankAccount: { type: String, require: true },
    accountOwner: { type: String, require: true },
    bankName: { type: String, require: true },
    bankName2: { type: String },
    province: { type: String },
    phone: { type: String },
    fax: { type: String },
    email: { type: String },
    homePage: { type: String },
    partner: { type: String },
    taxCode: { type: String },
    note: { type: String },
    branch: { type: String },
  },
  { timestamps: true }
);

// bankAccountSchema.index({ name: "text" }, { weights: { name: 2 } });

export const BankAccountHook = new ModelHook<IBankAccount>(bankAccountSchema);
export const BankAccountModel: mongoose.Model<IBankAccount> = MainConnection.model(
  "BankAccount",
  bankAccountSchema
);

export const BankAccountLoader = ModelLoader<IBankAccount>(BankAccountModel, BankAccountHook);
