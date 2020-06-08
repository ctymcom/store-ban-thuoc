import { CrudController } from "../../../base/crudController";
import { ExampleModel } from "./example.model";
import { FindOptions } from "sequelize";
import { Sequelize } from "../../../base/baseModel";
class ExampleController extends CrudController<typeof ExampleModel> {
  constructor() {
    super(ExampleModel);
  }
}

const exampleController = new ExampleController();

export { exampleController };
