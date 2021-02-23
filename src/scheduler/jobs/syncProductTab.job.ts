import { Job } from "agenda";
import moment from "moment-timezone";
import { Agenda } from "../agenda";
import chalk from "chalk";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { ProductTabModel } from "../../graphql/modules/productTab/productTab.model";

export class SyncProductTabJob {
  static jobName = "SyncProductTab";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncProductTabJob.jobName, moment().format());
    console.log(chalk.cyan("==> Động bộ danh mục tab sản phẩm"));
    await AritoHelper.setImageToken();
    const productTabUpdatedAt = await ProductTabModel.findOne()
      .sort({ updatedAt: -1 })
      .then((res) => {
        return res ? res.updatedAt : null;
      });
    const tabInfo = await AritoHelper.getTabInfo(1, productTabUpdatedAt);
    const productTabBulk = ProductTabModel.collection.initializeUnorderedBulkOp();
    console.log(chalk.yellow(`====> Có ${tabInfo.data.length} tab`));
    for (const tab of tabInfo.data) {
      productTabBulk
        .find({ code: tab.code })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: new Date() },
          $set: {
            ...tab,
            updatedAt: new Date(),
          },
        });
    }
    if (productTabBulk.length > 0) {
      await productTabBulk.execute();
    }
  }
}

export default SyncProductTabJob;
