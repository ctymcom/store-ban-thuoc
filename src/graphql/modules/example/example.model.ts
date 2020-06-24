import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type IExample = BaseDocument & {
  name?: string;
  exampleId?: string
};

const examplesSchema = new Schema(
  {
    name: { type: String },
    exampleId: { type: Schema.Types.ObjectId, ref: 'Example' },
  },
  { timestamps: true }
);

export const ExampleModel: mongoose.Model<IExample> = MainConnection.model(
  "Example",
  examplesSchema
);
