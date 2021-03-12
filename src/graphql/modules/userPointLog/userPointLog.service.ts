import { CrudService } from "../../../base/crudService";
import { UserPointLogModel } from "./userPointLog.model";
class UserPointLogService extends CrudService<typeof UserPointLogModel> {
  constructor() {
    super(UserPointLogModel);
  }
}

const userPointLogService = new UserPointLogService();

export { userPointLogService };
