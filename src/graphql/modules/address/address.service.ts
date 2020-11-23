import { CrudService } from "../../../base/crudService";
import { AddressModel } from "./address.model";
class AddressService extends CrudService<typeof AddressModel> {
  constructor() {
    super(AddressModel);
  }
}

const addressService = new AddressService();

export { addressService };
