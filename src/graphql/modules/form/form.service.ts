import { CrudService } from "../../../base/crudService";
import { FormModel } from "./form.model";
class FormService extends CrudService<typeof FormModel> {
  constructor() {
    super(FormModel);
  }
}

const formService = new FormService();

export { formService };
