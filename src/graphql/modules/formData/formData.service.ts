import { CrudService } from "../../../base/crudService";
import { FormDataModel } from "./formData.model";
class FormDataService extends CrudService<typeof FormDataModel> {
  constructor() {
    super(FormDataModel);
  }
}

const formDataService = new FormDataService();

export { formDataService };
