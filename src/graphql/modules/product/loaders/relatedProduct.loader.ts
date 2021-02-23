import DataLoader from "dataloader";
import { get, uniq } from "lodash";
import { Types } from "mongoose";

import { IProduct, ProductModel } from "../product.model";

export class RelatedProduct {
  static loader = new DataLoader<string, IProduct[]>(
    async (ids: string[]) => {
      const uniqIds = uniq(ids);
      const tasks: Promise<any>[] = [];
      uniqIds.forEach((id) => {
        tasks.push(
          ProductModel.aggregate([
            { $match: { categoryIds: Types.ObjectId(id) } },
            { $sample: { size: 5 } },
          ]).exec()
        );
      });
      return await Promise.all(tasks).then((res: any[]) => {
        return ids.map((id) => get(res, uniqIds.indexOf(id), []) as IProduct[]);
      });
    },
    { cache: false } // Bỏ cache
  );
}
