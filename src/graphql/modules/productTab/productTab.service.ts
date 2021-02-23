import { CrudService } from "../../../base/crudService";
import { CacheHelper } from "../../../helpers/cache.helper";
import { IProductTab, ProductTabModel } from "./productTab.model";
class ProductTabService extends CrudService<typeof ProductTabModel> {
  constructor() {
    super(ProductTabModel);
  }
  setProductTabs() {
    ProductTabModel.find({}).then((res) => {
      CacheHelper.set("product-tabs", res);
    });
  }
  getProductTabs() {
    CacheHelper.get("product-tabs") as IProductTab[];
  }
}

const productTabService = new ProductTabService();

export { productTabService };
