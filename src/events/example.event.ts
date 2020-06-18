import { Subject } from "rxjs";
import { Logger } from "../loaders/logger";
import { ErrorHelper } from "../base/error";
import { EventErrorModel } from "../graphql/modules/eventError/eventError.model";
import { EventErrorTypeEnum } from "../constants";

interface Example {
  message?: string;
}
const exampleSubject = new Subject<Example>();

exampleSubject.subscribe((data) => {
  try {
    console.log("Subscribe 2");
    console.log(data);
    throw ErrorHelper.createUserError("Có lỗi xảy ra");
  } catch (error) {
    Logger.error(error.toString(), {
      metadata: {
        stack: error.stack,
        name: error.name,
        message: error.message,
      },
    });
    EventErrorModel.create({
      type: EventErrorTypeEnum.example,
      data: data
    });
  }
});

export { exampleSubject };
