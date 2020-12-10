import { CrudService } from "../../../base/crudService";
import { counterService } from "../counter/counter.service";
import { FormModel } from "./form.model";
class FormService extends CrudService<typeof FormModel> {
  constructor() {
    super(FormModel);
  }
  generateCode() {
    return counterService.trigger("form").then((c) => c.toString());
  }
}

const formService = new FormService();

export { formService };
