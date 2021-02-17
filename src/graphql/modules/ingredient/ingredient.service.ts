import { CrudService } from "../../../base/crudService";
import { IngredientModel } from "./ingredient.model";
class IngredientService extends CrudService<typeof IngredientModel> {
  constructor() {
    super(IngredientModel);
  }
}

const ingredientService = new IngredientService();

export { ingredientService };
