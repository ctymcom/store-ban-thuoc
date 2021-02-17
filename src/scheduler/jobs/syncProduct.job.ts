import { Job } from "agenda";
import moment from "moment-timezone";
import { Agenda } from "../agenda";
import chalk from "chalk";
import {
  CategoryModel,
  CategoryType,
  ICategory,
} from "../../graphql/modules/category/category.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { get, keyBy } from "lodash";

export class SyncProductJob {
  static jobName = "SyncProduct";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncProductJob.jobName, moment().format());
    console.log(chalk.yellow("==> Động bộ danh mục sản phẩm..."));
    const categoryUpdatedAt = await CategoryModel.findOne()
      .sort({ updatedAt: -1 })
      .then((res) => {
        return res ? res.updatedAt : null;
      });
    for (const type of Object.values(CategoryType)) {
      console.log(chalk.yellow("====> Đồng bộ danh mục loại", type));
      let getCategoryResult = await AritoHelper.getAllCategory(type, 1, categoryUpdatedAt);
      const categoryBulk = CategoryModel.collection.initializeUnorderedBulkOp();
      do {
        console.log(chalk.yellow("======> Đồng bộ trang ", getCategoryResult.paging.page));
        let parentCategories: { [x: string]: ICategory } = {};
        if (
          getCategoryResult.data.length > 0 &&
          getCategoryResult.data[0].type != CategoryType.VT1
        ) {
          const parentCategoryCodes = getCategoryResult.data.map((d) =>
            d.code.substr(0, d.code.length - 2)
          );
          parentCategories = await CategoryModel.find({
            code: { $in: parentCategoryCodes },
          }).then((res) => keyBy(res, "code"));
        }
        getCategoryResult.data.forEach((d) => {
          const parentCategory = get(parentCategories, `${d.code.substr(0, d.code.length - 2)}`);
          categoryBulk
            .find({ code: d.code })
            .upsert()
            .updateOne({
              $set: {
                ...d,
                parentIds: parentCategory ? [parentCategory._id, ...parentCategory.parentIds] : [],
              },
            });
        });
        if (getCategoryResult.paging.page == getCategoryResult.paging.pageCount) break;
        getCategoryResult = await AritoHelper.getAllCategory(
          type,
          getCategoryResult.paging.page + 1,
          categoryUpdatedAt
        );
      } while (getCategoryResult.paging.page <= getCategoryResult.paging.pageCount);
      if (categoryBulk.length > 0) {
        console.log(chalk.yellow(`======> Đồng bộ ${categoryBulk.length} danh mục...`));
        await categoryBulk.execute();
      }
    }

    console.log(chalk.yellow("Động bộ hoạt chất..."));
    console.log(chalk.yellow("Động bộ sản phẩm..."));
  }
}

export default SyncProductJob;
