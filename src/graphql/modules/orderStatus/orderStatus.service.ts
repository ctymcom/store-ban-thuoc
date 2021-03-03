import { CrudService } from "../../../base/crudService";
import { OrderStatusModel } from "./orderStatus.model";
class OrderStatusService extends CrudService<typeof OrderStatusModel> {
  constructor() {
    super(OrderStatusModel);
  }
}

const orderStatusService = new OrderStatusService();

export { orderStatusService };
