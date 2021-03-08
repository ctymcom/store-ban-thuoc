import { CrudService } from "../../../base/crudService";
import { DeliveryMethodModel } from "./deliveryMethod.model";
class DeliveryMethodService extends CrudService<typeof DeliveryMethodModel> {
  constructor() {
    super(DeliveryMethodModel);
  }
}

const deliveryMethodService = new DeliveryMethodService();

export { deliveryMethodService };
