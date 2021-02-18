import { CrudService } from "../../../base/crudService";
import { FeedbackModel } from "./feedback.model";
class FeedbackService extends CrudService<typeof FeedbackModel> {
  constructor() {
    super(FeedbackModel);
  }
}

const feedbackService = new FeedbackService();

export { feedbackService };
