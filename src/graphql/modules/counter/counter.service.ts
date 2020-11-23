import { CrudService } from "../../../base/crudService";
import { CounterModel } from "./counter.model";
class CounterService extends CrudService<typeof CounterModel> {
  constructor() {
    super(CounterModel);
  }
}

const counterService = new CounterService();

export { counterService };
