import mongoose from "mongoose";
import DataLoader from "dataloader";
import _ from "lodash";
import uniqueValidator from "mongoose-unique-validator";
import { LRUMap } from "lru_map";
export type BaseDocument = mongoose.Document & {
  createdAt?: Date;
  updatedAt?: Date;
};

export type Model<T extends BaseDocument> = mongoose.Model<T>;

export function ModelLoader<T>(model: any): DataLoader<string, T> {
  model.schema.plugin(uniqueValidator, { message: "{VALUE} đã tồn tại." });

  return new DataLoader<string, T>(
    (ids: string[]) => {
      return model.find({ _id: { $in: ids } }).then((list: any[]) => {
        const listByKey = _.keyBy(list, "_id");
        return ids.map((id) => _.get(listByKey, id, undefined));
      });
    },
    { cacheMap: new LRUMap(100) } // Giới hạn chỉ cache 100 item sử dụng nhiêu nhất.
  );
}
