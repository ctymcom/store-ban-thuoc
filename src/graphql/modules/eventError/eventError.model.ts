import mongoose from "mongoose";
import { MainConnection } from "../../../loaders/database";
import { BaseDocument } from "../../../base/baseModel";
import {
  EventErrorTypeEnum,
  EventErrorStatusEnum,
} from "../../../constants/event.const";
const Schema = mongoose.Schema;

export type IEventError = BaseDocument & {
  type?: EventErrorTypeEnum;
  errorStack?: string;
  errorName?: string;
  errorMessage?: string;
  data?: any;
  status?: EventErrorStatusEnum
};

const eventErrorSchema = new Schema(
  {
    type: {
      type: String,
    },
    errorName: {
      type: String,
    },
    errorStack: {
      type: Schema.Types.Mixed,
    },
    errorMessage: {
      type: String,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    status: {
      type: String,
      enum: Object.keys(EventErrorStatusEnum),
      default: EventErrorStatusEnum.error
    },
  },
  { timestamps: true }
);

// eventErrorSchema.index({ name: "text" }, { weights: { name: 2 } });

export const EventErrorModel: mongoose.Model<IEventError> = MainConnection.model(
  "EventError",
  eventErrorSchema
);
