import { BaseModel, CrudRepository } from "./crud.repo";
export interface ProductTag extends BaseModel {
  code: string;
  name: string;
  name2: string;
  color: string;
  icon: string;
  position: number;
}

export class ProductTagRepository extends CrudRepository<ProductTag> {
  apiName: string = "ProductTag";
  shortFragment: string = this.parseFragment(`
    id: String
    code: String
    name: String
    position: Int
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    code: String
    name: String
    name2: String
    color: String
    icon: String
    position: Int
  `);
}

export const ProductTagService = new ProductTagRepository();
