import { CrudService } from "../../../base/crudService";
import { ExampleModel } from "./example.model";
class ExampleService extends CrudService<typeof ExampleModel> {
  constructor() {
    super(ExampleModel);
  }
}

const exampleService = new ExampleService();

export { exampleService };
