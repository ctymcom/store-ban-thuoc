import { CrudService } from "../../../base/crudService";
import { ProductTagModel } from "./productTag.model";
class ProductTagService extends CrudService<typeof ProductTagModel> {
  constructor() {
    super(ProductTagModel);
  }
}

const productTagService = new ProductTagService();

export { productTagService };
