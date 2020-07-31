import mongoose from "mongoose";

import { BaseDocument, ModelHook, ModelLoader } from "../../../base/baseModel";
import { MainConnection } from "../../../loaders/database";

const Schema = mongoose.Schema;

export type IExample = BaseDocument & {
  name?: string;
  exampleId?: string;
};

const exampleSchema = new Schema(
  {
    name: { type: String },
    exampleId: { type: Schema.Types.ObjectId, ref: "Example" },
  },
  { timestamps: true }
);

// exampleSchema.indexes.createIndex( { name: "text", description: "text" } )
exampleSchema.index({ name: "text" }, { weights: { name: 2 } });
export const ExampleModelHook = new ModelHook<IExample>(exampleSchema);
export const ExampleModel: mongoose.Model<IExample> = MainConnection.model(
  "Example",
  exampleSchema
);
export const ExampleLoader = ModelLoader<IExample>(ExampleModel, ExampleModelHook);
