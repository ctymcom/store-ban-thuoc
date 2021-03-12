import { Job } from "agenda";
import chalk from "chalk";
import { flatten, get, keyBy, uniq } from "lodash";
import moment from "moment-timezone";

import { OrderModel } from "../../graphql/modules/order/order.model";
import { ProductModel } from "../../graphql/modules/product/product.model";
import { UserAddressModel } from "../../graphql/modules/userAddress/userAddress.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";

export class SyncOrderJob {
  static jobName = "SyncOrder";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncOrderJob.jobName, moment().format());
    try {
      await AritoHelper.setImageToken();
      console.log(chalk.cyan("==> Động bộ đơn hàng..."));
      const updatedAt = await OrderModel.findOne()
        .sort({ updatedAt: -1 })
        .exec()
        .then((res) => {
          return res ? res.updatedAt : null;
        });
      let data = await AritoHelper.getAllOrder(1, updatedAt);
      const bulk = OrderModel.collection.initializeUnorderedBulkOp();
      do {
        console.log(chalk.yellow("====> Đồng bộ trang ", data.paging.page));
        const addresses = await UserAddressModel.find({
          addressId: { $in: data.data.map((d) => d.addressId) },
        }).then((res) => keyBy(res, "addressId"));
        const productCodes = uniq(flatten(data.data.map((o) => o.items.map((i) => i.productCode))));
        const products = await ProductModel.find({ code: { $in: productCodes } }).then((res) =>
          keyBy(res, "code")
        );
        for (const d of data.data) {
          const setData = {
            ...d,
            updatedAt: new Date(),
            addressId: d.addressId,
            fullAddress: d.fullAddress,
            contactName: get(addresses, d.addressId + ".contactName", ""),
            address: get(addresses, d.addressId + ".address", ""),
            provinceId: get(addresses, d.addressId + ".provinceId", ""),
            districtId: get(addresses, d.addressId + ".districtId", ""),
            wardId: get(addresses, d.addressId + ".wardId", ""),
            phone: get(addresses, d.addressId + ".phone", ""),
            location: get(addresses, d.addressId + ".location", ""),
            items: d.items.map((i) => ({
              ...i,
              productName: products[i.productCode].name,
              productId: products[i.productCode]._id,
            })),
          };
          bulk.find({ code: d.code }).upsert().updateOne({ $set: setData });
        }
        if (data.paging.page == data.paging.pageCount) break;
        data = await AritoHelper.getAllOrder(data.paging.page + 1, updatedAt);
      } while (data.paging.page <= data.paging.pageCount);
      if (bulk.length > 0) {
        console.log(chalk.yellow(`====> Đồng bộ ${bulk.length} đơn...`));
        await bulk.execute();
      }
      console.log(chalk.green("==> Đồng bộ xong"));
    } catch (err) {
      console.log(chalk.red("Động bộ lỗi", err.message));
    }
  }
}

export default SyncOrderJob;
