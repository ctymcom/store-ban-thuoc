import { Subject } from "rxjs";
import { Logger } from "../loaders/logger";
import { ErrorHelper } from "../base/error";

interface Example {
  message?: string;
}
const exampleSubject = new Subject<Example>();

exampleSubject.subscribe((example) => {
  try {
    console.log("Subscribe 1");
    console.log(example);
  } catch (error) {
    Logger.error(error.toString(), {
      metadata: {
        stack: error.stack,
        name: error.name,
        message: error.message,
      },
    });
  }
});

exampleSubject.subscribe((example) => {
  try {
    console.log("Subscribe 2");
    console.log(example);
    throw ErrorHelper.createUserError("Có lỗi xảy ra");
  } catch (error) {
    Logger.error(error.toString(), {
      metadata: {
        stack: error.stack,
        name: error.name,
        message: error.message,
      },
    });
  }
});

export { exampleSubject };
