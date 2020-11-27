import { CrudService } from "../../../base/crudService";
import { CommissionLogModel } from "./commissionLog.model";
class CommissionLogService extends CrudService<typeof CommissionLogModel> {
  constructor() {
    super(CommissionLogModel);
  }
}

const commissionLogService = new CommissionLogService();

export { commissionLogService };
