import { Subject } from "rxjs";
import { Logger } from "../loaders/logger";
import { ErrorHelper } from "../base/error";
import { EventErrorModel } from "../graphql/modules/eventError/eventError.model";
import { EventErrorTypeEnum } from "../constants/event.const";
import { BaseEvent } from "../base/baseEvent";
import { AsyncFunction } from "async";
import { ISetting } from "../graphql/modules/setting/setting.model";

interface Example {
  settings: ISetting;
}
class ExampleEvent extends BaseEvent<Example> {
  constructor() {
    super();
  }

  async parseData(data: any) {}

  async toJSON(data: any) {
    return data;
  }
}

const exampleEvent = new ExampleEvent();

exampleEvent.regisRule(EventErrorTypeEnum.example_1, async (data: Example) => {
  console.log("funcExample1");
});

exampleEvent.regisRule(EventErrorTypeEnum.example_2, async (data: Example) => {
  console.log("ERROR NE`");
  throw ErrorHelper.createUserError("Có lỗi xảy ra");
});

export { exampleEvent };
