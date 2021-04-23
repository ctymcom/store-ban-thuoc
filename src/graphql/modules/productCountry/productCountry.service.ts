import { CrudService } from "../../../base/crudService";
import { ProductCountryModel } from "./productCountry.model";
class ProductCountryService extends CrudService<typeof ProductCountryModel> {
  constructor() {
    super(ProductCountryModel);
  }
}

const productCountryService = new ProductCountryService();

export { productCountryService };
