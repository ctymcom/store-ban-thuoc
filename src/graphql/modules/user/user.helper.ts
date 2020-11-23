import { IUser, UserModel } from "./user.model";
import { AddressModel } from "../address/address.model";
import { ErrorHelper } from "../../../base/error";
import { UtilsHelper } from "../../../helpers/utils.helper";
import { DeviceInfoModel } from "../deviceInfo/deviceInfo.model";
import DataLoader from "dataloader";
import { NotificationModel } from "../notification/notification.model";
import { Types } from "mongoose";
import { get, keyBy } from "lodash";

export class UserHelper {
  constructor(public user: IUser) {}

  static unseenNotifyLoader = new DataLoader<string, number>(
    (ids: string[]) => {
      return NotificationModel.aggregate([
        {
          $match: {
            userId: { $in: ids.map(Types.ObjectId) },
            seen: false,
          },
        },
        { $group: { _id: "$userId", count: { $sum: 1 } } },
      ])
        .exec()
        .then((list: any[]) => {
          const listByKey = keyBy(list, "_id");
          return ids.map((id) => get(listByKey, `${id}.count`, 0));
        });
    },
    { cache: false } // Bỏ cache
  );
  value() {
    return this.user;
  }
  async setProvinceName() {
    if (!this.user.provinceId) return this;
    const address = await AddressModel.findOne({ provinceId: this.user.provinceId });
    if (!address) throw ErrorHelper.mgRecoredNotFound("Tỉnh / thành");
    this.user.province = address.province;
    return this;
  }
  async setDistrictName() {
    if (!this.user.districtId) return this;
    const address = await AddressModel.findOne({ districtId: this.user.districtId });
    if (!address) throw ErrorHelper.mgRecoredNotFound("Quận / Huyện");
    this.user.district = address.district;
    return this;
  }
  async setWardName() {
    if (!this.user.wardId) return this;
    const address = await AddressModel.findOne({ wardId: this.user.wardId });
    if (!address) throw ErrorHelper.mgRecoredNotFound("Phường / Xã");
    this.user.ward = address.ward;
    return this;
  }
  async setDevice(deviceId: string, deviceToken: string) {
    await DeviceInfoModel.remove({ $or: [{ userId: this.user._id }, { deviceId }] });
    await DeviceInfoModel.create({
      userId: this.user._id,
      deviceId,
      deviceToken,
    });
  }

  async getUnseenNotify() {
    return await UserHelper.unseenNotifyLoader.load(this.user._id.toString());
  }
}
