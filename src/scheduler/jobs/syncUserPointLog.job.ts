import { Job } from "agenda";
import moment from "moment-timezone";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";
import chalk from "chalk";
import { UserPointLogModel } from "../../graphql/modules/userPointLog/userPointLog.model";
import { keyBy } from "lodash";

export class SyncUserPointLogJob {
  static jobName = "SyncUserPointLog";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncUserPointLogJob.jobName, moment().format());
    try {
      const currentDate = new Date();
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Động bộ điểm thưởng..."));
      const reasons = await AritoHelper.getAllReason().then((res) => keyBy(res, "code"));
      const updatedAt = await UserPointLogModel.findOne()
        .sort({ syncAt: -1 })
        .exec()
        .then((res) => {
          return res ? res.syncAt : moment().set("year", 2020).toDate();
        });
      let data = await AritoHelper.getAllReasonPoint(1, updatedAt);
      const bulk = UserPointLogModel.collection.initializeUnorderedBulkOp();
      do {
        console.log(chalk.yellow("====> Đồng bộ trang ", data.paging.page));
        data.data.forEach((d) => {
          bulk
            .find({ code: d.code })
            .upsert()
            .updateOne({
              $set: {
                ...d,
                note: reasons[d.reasonCode].name,
                note2: reasons[d.reasonCode].name2,
                updatedAt: currentDate,
                syncAt: currentDate,
              },
            });
        });
        if (data.paging.page == data.paging.pageCount) break;
        data = await AritoHelper.getAllReasonPoint(data.paging.page + 1, updatedAt);
      } while (data.paging.page <= data.paging.pageCount);
      if (bulk.length > 0) {
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} log điểm...`));
        await bulk.execute();
      }
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ điểm thưởng lỗi", err.message));
    }
  }
}

export default SyncUserPointLogJob;
