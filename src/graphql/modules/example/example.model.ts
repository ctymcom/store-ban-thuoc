import mongoose, { Schema, Document, Model } from "mongoose";
import { MainConnection } from "../../../loaders/database";
export interface IUser extends Document {
  name: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String },
});

// Export the model and return your IUser interface
export const ExampleModel = MainConnection.model<IUser>("User", UserSchema);
