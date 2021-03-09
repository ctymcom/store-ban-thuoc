import { CrudService } from "../../../base/crudService";
import { ProductCommentModel } from "./productComment.model";
class ProductCommentService extends CrudService<typeof ProductCommentModel> {
  constructor() {
    super(ProductCommentModel);
  }
}

const productCommentService = new ProductCommentService();

export { productCommentService };
