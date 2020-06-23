import mongoose from "mongoose";
export type BaseDocument = mongoose.Document & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type Model<T extends BaseDocument> = mongoose.Model<T>;
