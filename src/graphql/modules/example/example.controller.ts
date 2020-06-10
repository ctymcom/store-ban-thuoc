import { CrudController } from "../../../base/crudController";
import { ExampleModel } from "./example.model";
class ExampleController extends CrudController<typeof ExampleModel> {
  constructor() {
    super(ExampleModel);
  }
}

const exampleController = new ExampleController();

export { exampleController };
