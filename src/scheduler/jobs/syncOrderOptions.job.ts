import { Job } from "agenda";
import moment from "moment-timezone";
import { OrderStatusModel } from "../../graphql/modules/orderStatus/orderStatus.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";
import chalk from "chalk";
import { DeliveryMethodModel } from "../../graphql/modules/deliveryMethod/deliveryMethod.model";

export class SyncOrderOptionsJob {
  static jobName = "SyncOrderOptions";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncOrderOptionsJob.jobName, moment().format());
    try {
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Động bộ phương thức giao hàng..."));
      let data = await AritoHelper.getDeliveryMethod();

      const bulk = DeliveryMethodModel.collection.initializeUnorderedBulkOp();
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
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} phương thức...`));
        await bulk.execute();
      }
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ phương thức giao hàng lỗi", err.message));
    }
  }
}

export default SyncOrderOptionsJob;
