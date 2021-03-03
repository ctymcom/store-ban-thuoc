import { CrudService } from "../../../base/crudService";
import { AritoOptionModel } from "./aritoOption.model";
class AritoOptionService extends CrudService<typeof AritoOptionModel> {
  constructor() {
    super(AritoOptionModel);
  }
}

const aritoOptionService = new AritoOptionService();

export { aritoOptionService };
