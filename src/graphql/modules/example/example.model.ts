import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IExample = BaseDocument & {
  name: String;
};

const examplesSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const ExampleModel: mongoose.Model<IExample> = MainConnection.model(
  "Example",
  examplesSchema
);
