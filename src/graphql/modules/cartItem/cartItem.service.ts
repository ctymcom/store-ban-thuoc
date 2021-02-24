import { CrudService } from "../../../base/crudService";
import { CartItemModel } from "./cartItem.model";
class CartItemService extends CrudService<typeof CartItemModel> {
  constructor() {
    super(CartItemModel);
  }
}

const cartItemService = new CartItemService();

export { cartItemService };
