import { CrudController } from "../../../base/crudController";
import { EventErrorModel } from "./eventError.model";
import { ErrorHelper } from "../../../base/error";
import { EventErrorTypeEnum, EventErrorStatusEnum } from "../../../constants";
import { exampleEvent } from "../../../events";
import { BaseEvent } from "../../../base/baseEvent";
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

    BaseEvent.resolve(eventError.type, eventError.data);
    eventError.set("status", EventErrorStatusEnum.resolved);
    return eventError.save();
  }

  async resolveMultiEventError(params: any) {
    let { ids } = params;

    console.log(params);
    let eventErrors = await this.model.findAll({
      where: {
        id: {
          $in: ids,
        },
        status: EventErrorStatusEnum.error,
      },
    });

    for (let eventError of eventErrors) {
      // if (!eventError)
      //   throw ErrorHelper.recoredNotFound("Không tìm thấy event này");
      // if (eventError.status !== EventErrorStatusEnum.error)
      //   throw ErrorHelper.error(`Trạng thái của event này không hợp lệ.`);
      BaseEvent.resolve(eventError.type, eventError.data);
      eventError.set("status", EventErrorStatusEnum.resolved);
      eventError.save();
    }

    return eventErrors.length;
  }
}

const eventErrorController = new EventErrorController();

export { eventErrorController };
