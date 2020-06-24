---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.model.ts
---
import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument } from "../../../base/baseModel";
const Schema = mongoose.Schema;

export type I<%= h.inflection.camelize(name) %> = BaseDocument & {
  name?: string;
};

const <%= h.inflection.camelize(name, true) %>Schema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

// <%= h.inflection.camelize(name, true) %>Schema.index({ name: "text" }, { weights: { name: 2 } });

export const <%= h.inflection.camelize(name) %>Model: mongoose.Model<I<%= h.inflection.camelize(name) %>> = MainConnection.model(
  "<%= h.inflection.camelize(name) %>",
  <%= h.inflection.camelize(name, true) %>Schema
);
