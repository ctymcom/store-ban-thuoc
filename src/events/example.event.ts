import { Subject } from "rxjs";
import { Logger } from "../loaders/logger";
import { ErrorHelper } from "../base/error";
import { EventErrorModel } from "../graphql/modules/eventError/eventError.model";
import { EventErrorTypeEnum } from "../constants";
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

  register() {
    this.mapObject = {
      [EventErrorTypeEnum.example_1]: this.funcExample1,
      [EventErrorTypeEnum.example_2]: this.funcExample2,
    };

    Object.keys(this.mapObject).forEach((key: EventErrorTypeEnum) => {
      this.subject.subscribe((data) => {
        this.exec(this.mapObject[key], data, key);
      });
    });
  }

  async funcExample1(data: Example) {
    console.log("funcExample1");
  }

  async funcExample2(data: Example) {
    console.log("ERROR NE`");
    throw ErrorHelper.createUserError("Có lỗi xảy ra");
  }

  async parseData(data: any) {}

  async toJSON(data: any) {
    return data;
  }
}

const exampleSubject = new ExampleEvent().subject;

export { exampleSubject };
