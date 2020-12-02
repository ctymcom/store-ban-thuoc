import { CrudService } from "../../../base/crudService";
import { RegisSMSModel } from "./regisSMS.model";
class RegisSMSService extends CrudService<typeof RegisSMSModel> {
  constructor() {
    super(RegisSMSModel);
  }
}

const regisSMSService = new RegisSMSService();

export { regisSMSService };
