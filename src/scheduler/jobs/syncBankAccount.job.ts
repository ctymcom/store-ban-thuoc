import { Job } from "agenda";
import moment from "moment-timezone";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";
import chalk from "chalk";
import { BankAccountModel } from "../../graphql/modules/bankAccount/bankAccount.model";

export class SyncBankAccountJob {
  static jobName = "SyncBankAccount";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    try {
      const currentDate = new Date();
      console.log("Execute Job " + SyncBankAccountJob.jobName, moment().format());
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Đồng bộ tài khoản ngân hàng..."));
      // const updatedAt = await BankAccountModel.findOne()
      //   .sort({ syncAt: -1 })
      //   .exec()
      //   .then((res) => {
      //     return res ? res.syncAt : null;
      //   });
      let data = await AritoHelper.getAllBankAccount(1);

      const bulk = BankAccountModel.collection.initializeUnorderedBulkOp();
      do {
        data.data.forEach((d) => {
          bulk
            .find({ bankAccount: d.bankAccount })
            .upsert()
            .updateOne({
              $setOnInsert: { createdAt: currentDate },
              $set: { ...d, updatedAt: currentDate, syncAt: currentDate },
            });
        });
        if (data.paging.page == data.paging.pageCount) break;
        data = await AritoHelper.getAllBankAccount(data.paging.page + 1);
      } while (data.paging.page <= data.paging.pageCount);
      if (bulk.length > 0) {
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} ngân hàng...`));
        await bulk.execute();
      }

      console.log(chalk.cyan("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.cyan("==> Đồng bộ lỗi", err.message));
    }
  }
}

export default SyncBankAccountJob;
