import { CrudService } from "../../../base/crudService";
import { PromotionModel } from "./promotion.model";
class PromotionService extends CrudService<typeof PromotionModel> {
  constructor() {
    super(PromotionModel);
  }
}

const promotionService = new PromotionService();

export { promotionService };
