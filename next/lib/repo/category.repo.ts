import { BaseModel, CrudRepository } from "./crud.repo";
export interface Category extends BaseModel {
  type: string;
  code: string;
  name: string;
  parentIds: string[];
  parents: Category[];
}

export class CategoryRepository extends CrudRepository<Category> {
  apiName: string = "Category";
  shortFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    type: String
    code: String
    name: String
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    type: String
    code: String
    name: String
    parentIds: [ID]
    parents { id name }: [Category]
  `);
}

export const CategoryService = new CategoryRepository();
