import { Job } from "agenda";
import chalk from "chalk";
import { get, keyBy } from "lodash";
import moment from "moment-timezone";

import { AddressModel } from "../../graphql/modules/address/address.model";
import { AritoHelper } from "../../helpers/arito/arito.helper";
import { Agenda } from "../agenda";

export class SyncLocationDataJob {
  static jobName = "SyncLocationData";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static async execute(job: Job) {
    console.log("Execute Job " + SyncLocationDataJob.jobName, moment().format());
    await AritoHelper.setImageToken();
    console.log(chalk.cyan("==> Đồng bộ dữ liệu địa chỉ..."));
    const locationUpdatedAt = await AddressModel.findOne()
      .sort({ syncAt: -1 })
      .exec()
      .then((res) => {
        return res ? res.syncAt : null;
      });
    console.log(chalk.yellow("====> Đồng bộ tỉnh thành..."));
    await syncProvince(locationUpdatedAt);
    console.log(chalk.yellow("====> Đồng bộ quận huyện..."));
    await syncDistrict(locationUpdatedAt);
    console.log(chalk.yellow("====> Đồng bộ phường xã..."));
    await syncWard(locationUpdatedAt);
    console.log(chalk.green("==> Đồng bộ xong Địa chỉ"));
  }
}
async function syncWard(updatedAt?: Date) {
  const currentDate = new Date();
  let wardData = await AritoHelper.getAllWard(1, updatedAt);
  const wardBulk = AddressModel.collection.initializeUnorderedBulkOp();
  do {
    console.log(chalk.yellow("====> Đồng bộ trang ", wardData.paging.page));
    const districtIds = wardData.data.map((d) => d.districtId);
    const districts = await AddressModel.find({
      districtId: { $in: districtIds },
      wardId: { $exists: false },
    }).then((res) => keyBy(res, "districtId"));
    wardData.data.forEach((d) => {
      wardBulk
        .find({ wardId: d.id })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: currentDate },
          $set: {
            provinceId: get(districts, `${d.districtId}.provinceId`, ""),
            province: get(districts, `${d.districtId}.province`, ""),
            districtId: get(districts, `${d.districtId}.districtId`, ""),
            district: get(districts, `${d.districtId}.district`, ""),
            wardId: d.id,
            ward: d.name,
            updatedAt: currentDate,
            syncAt: currentDate,
          },
        });
    });
    if (wardData.paging.page == wardData.paging.pageCount) break;
    wardData = await AritoHelper.getAllWard(wardData.paging.page + 1, updatedAt);
  } while (wardData.paging.page <= wardData.paging.pageCount);
  if (wardBulk.length > 0) {
    console.log(chalk.yellow(`====> Đồng bộ ${wardBulk.length} phường xã...`));
    await wardBulk.execute();
  }
}
async function syncDistrict(updatedAt?: Date) {
  const currentDate = new Date();
  let districtData = await AritoHelper.getAllDistrict(1, updatedAt);
  const districtBulk = AddressModel.collection.initializeUnorderedBulkOp();
  do {
    console.log(chalk.yellow("====> Đồng bộ trang ", districtData.paging.page));
    const provinceIds = districtData.data.map((d) => d.provinceId);
    const provinces = await AddressModel.find({
      provinceId: { $in: provinceIds },
      districtId: { $exists: false },
    }).then((res) => keyBy(res, "provinceId"));
    districtData.data.forEach((d) => {
      districtBulk
        .find({ districtId: d.id })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: currentDate },
          $set: {
            provinceId: get(provinces, `${d.provinceId}.provinceId`, ""),
            province: get(provinces, `${d.provinceId}.province`, ""),
            districtId: d.id,
            district: d.name,
            updatedAt: currentDate,
            syncAt: currentDate,
          },
        });
    });
    if (districtData.paging.page == districtData.paging.pageCount) break;
    districtData = await AritoHelper.getAllDistrict(districtData.paging.page + 1, updatedAt);
  } while (districtData.paging.page <= districtData.paging.pageCount);
  if (districtBulk.length > 0) {
    console.log(chalk.yellow(`====> Đồng bộ ${districtBulk.length} quận huyện...`));
    await districtBulk.execute();
  }
}
async function syncProvince(updatedAt?: Date) {
  const currentDate = new Date();
  let provinceData = await AritoHelper.getAllProvince(1, updatedAt);
  const provinceBulk = AddressModel.collection.initializeUnorderedBulkOp();
  do {
    console.log(chalk.yellow("====> Đồng bộ trang ", provinceData.paging.page));
    provinceData.data.forEach((d) => {
      provinceBulk
        .find({ provinceId: d.id })
        .upsert()
        .updateOne({
          $setOnInsert: { createdAt: currentDate },
          $set: {
            provinceId: d.id,
            province: d.name,
            updatedAt: currentDate,
            syncAt: currentDate,
          },
        });
    });
    if (provinceData.paging.page == provinceData.paging.pageCount) break;
    provinceData = await AritoHelper.getAllProvince(provinceData.paging.page + 1, updatedAt);
  } while (provinceData.paging.page <= provinceData.paging.pageCount);
  if (provinceBulk.length > 0) {
    console.log(chalk.yellow(`====> Đồng bộ ${provinceBulk.length} tỉnh thành...`));
    await provinceBulk.execute();
  }
}

export default SyncLocationDataJob;
