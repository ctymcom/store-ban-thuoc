import { CrudService } from "../../../base/crudService";
import { CustomerPointLogModel } from "./customerPointLog.model";
class CustomerPointLogService extends CrudService<typeof CustomerPointLogModel> {
  constructor() {
    super(CustomerPointLogModel);
  }
}

const customerPointLogService = new CustomerPointLogService();

export { customerPointLogService };
