import { ErrorHelper } from "../../../base/error";
import { AddressModel } from "../address/address.model";
import { DeviceInfoModel } from "../deviceInfo/deviceInfo.model";
import { IUser } from "./user.model";

export class UserHelper {
  constructor(public user: IUser) {}

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
}
