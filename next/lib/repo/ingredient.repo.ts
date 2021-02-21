import { BaseModel, CrudRepository } from "./crud.repo";
export interface Ingredient extends BaseModel {
  code: String;
  name: String;
}

export class IngredientRepository extends CrudRepository<Ingredient> {
  apiName: string = "Ingredient";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    code: String
    name: String
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    code: String
    name: String
  `);
}

export const IngredientService = new IngredientRepository();
