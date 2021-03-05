import { CrudService } from "../../../base/crudService";
import { ProductContainerModel } from "./productContainer.model";
class ProductContainerService extends CrudService<typeof ProductContainerModel> {
  constructor() {
    super(ProductContainerModel);
  }
}

const productContainerService = new ProductContainerService();

export { productContainerService };
