import { CrudController } from "../../../base/crudController";
import { EventErrorModel } from "./eventError.model";
import { ErrorHelper } from "../../../base/error";
import { EventErrorTypeEnum, EventErrorStatusEnum } from "../../../constants";
import { exampleSubject } from "../../../events";
class EventErrorController extends CrudController<typeof EventErrorModel> {
  constructor() {
    super(EventErrorModel);
  }

  async resolveEventError(params: any) {
    let { id } = params;

    let eventError = await this.model.findOne({
      where: {
        id,
      },
    });

    if (!eventError)
      throw ErrorHelper.recoredNotFound("Không tìm thấy event này");
    if (eventError.status !== EventErrorStatusEnum.error)
      throw ErrorHelper.error(`Trạng thái của event này không hợp lệ.`);

    let objectMap = {
      [EventErrorTypeEnum.example]: exampleSubject,
    };

    let subject = objectMap[eventError.get("type")];
    if (!subject)
      throw ErrorHelper.error(`Chưa hỗ trợ resolve type: ${eventError.type}`);

    subject.next(eventError.data);
    eventError.set("status", EventErrorStatusEnum.resolved);
    return eventError.save();
  }
}

const eventErrorController = new EventErrorController();

export { eventErrorController };
