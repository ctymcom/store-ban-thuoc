import { CrudService } from "../../../base/crudService";
import { RegisServiceModel } from "./regisService.model";
class RegisServiceService extends CrudService<typeof RegisServiceModel> {
  constructor() {
    super(RegisServiceModel);
  }
}

const regisServiceService = new RegisServiceService();

export { regisServiceService };
