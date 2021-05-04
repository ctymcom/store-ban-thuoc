import { Job } from "agenda";
import chalk from "chalk";
import moment from "moment-timezone";

import { NotificationModel } from "../../graphql/modules/notification/notification.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";

export class SyncUserNotificationJob {
  static jobName = "SyncUserNotification";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncUserNotificationJob.jobName, moment().format());
    try {
      const currentDate = new Date();
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Động bộ thông báo khách hàng..."));
      const updatedAt = await NotificationModel.findOne()
        .sort({ syncAt: -1 })
        .exec()
        .then((res) => {
          return res
            ? moment(res.syncAt).subtract(1, "hour").toDate()
            : moment().set("year", 2020).toDate();
        });
      // const updatedAt = null;
      let data = await AritoHelper.getAllUserNotify(1, updatedAt);
      const bulk = NotificationModel.collection.initializeUnorderedBulkOp();
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
        data = await AritoHelper.getAllUserNotify(data.paging.page + 1, updatedAt);
      } while (data.paging.page <= data.paging.pageCount);
      if (bulk.length > 0) {
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} thông báo...`));
        await bulk.execute();
      }
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ thông báo lỗi", err.message));
    }
  }
}

export default SyncUserNotificationJob;
