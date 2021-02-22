import { CrudService } from "../../../base/crudService";
import { ProductTabModel } from "./productTab.model";
class ProductTabService extends CrudService<typeof ProductTabModel> {
  constructor() {
    super(ProductTabModel);
  }
}

const productTabService = new ProductTabService();

export { productTabService };
