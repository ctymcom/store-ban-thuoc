import { Job } from "agenda";
import chalk from "chalk";
import moment from "moment-timezone";

import { AritoOptionModel } from "../../graphql/modules/aritoOption/aritoOption.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";

export class SyncAritoOptionsJob {
  static jobName = "SyncAritoOptions";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncAritoOptionsJob.jobName, moment().format());
    try {
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Động bộ options..."));
      let data = await AritoHelper.getAllOptions(1);
      const bulk = AritoOptionModel.collection.initializeUnorderedBulkOp();
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
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} options...`));
        await bulk.execute();
      }
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ lỗi", err.message));
    }
  }
}

export default SyncAritoOptionsJob;
