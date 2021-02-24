import { CrudService } from "../../../base/crudService";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { UserAddressModel } from "./userAddress.model";
class UserAddressService extends CrudService<typeof UserAddressModel> {
  constructor() {
    super(UserAddressModel);
  }
  async syncUserAddress(userId: string) {
    await AritoHelper.getUserAddress(userId).then(async (res) => {
      const addressBulk = UserAddressModel.collection.initializeUnorderedBulkOp();
      res.data.forEach((d) => {
        addressBulk
          .find({ addressId: d.addressId, userId: userId })
          .upsert()
          .updateOne({ $set: d });
      });
      if (addressBulk.length > 0) return await addressBulk.execute();
    });
  }
}

const userAddressService = new UserAddressService();

export { userAddressService };
