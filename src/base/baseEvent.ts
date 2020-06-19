import { AsyncFunction } from "async";
import { Subject } from "rxjs";
import { Logger } from "../loaders/logger";
import { EventErrorTypeEnum } from "../constants";
import { EventErrorModel } from "../graphql/modules/eventError/eventError.model";

export class BaseEvent<T> {
  mapObject: any = {};

  constructor() {
    this.register();
  }
  subject = new Subject<T>();

  register() {}

  async exec(func: any, data: any, type: EventErrorTypeEnum) {
    try {
      await func(data);
    } catch (error) {
      Logger.error(error.toString(), {
        metadata: {
          stack: error.stack,
          name: error.name,
          message: error.message,
        },
      });
      EventErrorModel.create({
        type: type,
        errorStack: error.stack,
        errorName: error.name,
        errorMessage: error.message,
        data: await this.toJSON(data),
      });
    }
  }

  async parseData(data: any) {}
  async toJSON(data: any) {}
  async resolve() {}
}
