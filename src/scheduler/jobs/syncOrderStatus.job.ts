import { Job } from "agenda";
import moment from "moment-timezone";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";
import chalk from "chalk";
import { OrderStatusModel } from "../../graphql/modules/orderStatus/orderStatus.model";

export class SyncOrderStatusJob {
  static jobName = "SyncOrderStatus";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncOrderStatusJob.jobName, moment().format());
    try {
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Động bộ trạng thái đơn hàng..."));
      let data = await AritoHelper.getOrderStatus();

      const bulk = OrderStatusModel.collection.initializeUnorderedBulkOp();
      data.forEach((d) => {
        bulk
          .find({ code: d.code })
          .upsert()
          .updateOne({
            $setOnInsert: { createdAt: new Date() },
            $set: { ...d, updatedAt: new Date() },
          });
      });
      if (bulk.length > 0) {
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} trạng thái...`));
        await bulk.execute();
      }
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ trạng thái đơn hàng lỗi", err.message));
    }
  }
}

export default SyncOrderStatusJob;
