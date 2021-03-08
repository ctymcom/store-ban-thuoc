import { CrudService } from "../../../base/crudService";
import { PaymentMethodModel } from "./paymentMethod.model";
class PaymentMethodService extends CrudService<typeof PaymentMethodModel> {
  constructor() {
    super(PaymentMethodModel);
  }
}

const paymentMethodService = new PaymentMethodService();

export { paymentMethodService };
