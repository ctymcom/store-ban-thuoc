import { Job } from "agenda";
import moment from "moment-timezone";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";
import chalk from "chalk";
import { PromotionModel } from "../../graphql/modules/promotion/promotion.model";

export class SyncPromotionJob {
  static jobName = "SyncPromotion";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncPromotionJob.jobName, moment().format());
    try {
      const currentDate = new Date();
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Động bộ khuyến mãi..."));
      const updatedAt = await PromotionModel.findOne()
        .sort({ syncAt: -1 })
        .exec()
        .then((res) => {
          return res ? res.syncAt : null;
        });
      let data = await AritoHelper.getAllPromotion(1, updatedAt);
      const bulk = PromotionModel.collection.initializeUnorderedBulkOp();
      do {
        console.log(chalk.yellow("====> Đồng bộ trang ", data.paging.page));
        data.data.forEach((d) => {
          bulk
            .find({ code: d.code })
            .upsert()
            .updateOne({
              $setOnInsert: { createdAt: currentDate },
              $set: { ...d, updatedAt: currentDate, syncAt: currentDate },
            });
        });
        if (data.paging.page == data.paging.pageCount) break;
        data = await AritoHelper.getAllPromotion(data.paging.page + 1, updatedAt);
      } while (data.paging.page <= data.paging.pageCount);
      if (bulk.length > 0) {
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} khuyến mãi...`));
        await bulk.execute();
      }
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ lỗi", err.message));
    }
  }
}

export default SyncPromotionJob;
