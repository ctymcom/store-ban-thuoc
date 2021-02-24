import { CrudService } from "../../../base/crudService";
import { UserAddressModel } from "./userAddress.model";
class UserAddressService extends CrudService<typeof UserAddressModel> {
  constructor() {
    super(UserAddressModel);
  }
}

const userAddressService = new UserAddressService();

export { userAddressService };
