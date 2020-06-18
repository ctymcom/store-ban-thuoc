import { CrudController } from "../../../base/crudController";
import { EventErrorModel } from "./eventError.model";
class EventErrorController extends CrudController<typeof EventErrorModel> {
  constructor() {
    super(EventErrorModel);
  }
}

const eventErrorController = new EventErrorController();

export { eventErrorController };
