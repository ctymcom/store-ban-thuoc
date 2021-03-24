import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument, ModelLoader, ModelHook } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IBankAccount = BaseDocument & {
  unitID?: string,//unit_id
  account?: string,//tk
  bankAccount?:string,//tknh
  accountOwner?:string,//chu_tk
  bankName?:string,//ten_nh
  bankName2?:string,//ten_nh2
  province?:string,//tinh_thanh
  phone?:string,//phone
  fax?:string,//fax
  email?:string,//email
  homePage?:string,//home_page
  partner?:string,//doi_tac
  taxCode?:string,//ma_so_thue
  note?:string,//ghi_chu
  branch?:string,//chi_nhanh
};

const bankAccountSchema = new Schema(
  {
    unitID: { type: String, require:true },
    account:{type:String,require:true},
    bankAccount:{type:String,require:true},
    accountOwner:{type:String,require:true},
    bankName:{type:String,require:true},
    bankName2:{type:String},
    province:{type:String},
    phone:{type:String},
    fax:{type:String},
    email:{type:String},
    homePage:{type:String},
    partner:{type:String},
    taxCode:{type:String},
    note:{type:String},
    branch:{type:String},
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
