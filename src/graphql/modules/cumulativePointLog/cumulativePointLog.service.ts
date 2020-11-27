import { CrudService } from "../../../base/crudService";
import { CumulativePointLogModel } from "./cumulativePointLog.model";
class CumulativePointLogService extends CrudService<typeof CumulativePointLogModel> {
  constructor() {
    super(CumulativePointLogModel);
  }
}

const cumulativePointLogService = new CumulativePointLogService();

export { cumulativePointLogService };
