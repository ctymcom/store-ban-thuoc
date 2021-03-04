import { BaseModel, CrudRepository } from "./crud.repo";
export interface Promotion extends BaseModel {
  code?: string; // Mã khuyến mãi
  name?: string; // Tên khuyến mãi
  description?: string; // Mô tả
}

export class PromotionRepository extends CrudRepository<Promotion> {
  apiName: string = "Promotion";
  shortFragment: string = this.parseFragment(`
    id: String
    code: String
    name: String
    description: String
  `);
  fullFragment: string = this.parseFragment(`
    id: String
    code: String
    name: String
    description: String
  `);
}

export const PromotionService = new PromotionRepository();
