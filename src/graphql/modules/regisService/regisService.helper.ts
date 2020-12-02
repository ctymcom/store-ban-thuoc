import { counterService } from "../counter/counter.service";
import { IRegisService } from "./regisService.model";

export class RegisServiceHelper {
  constructor(public regisService: IRegisService) {}

  static generateCode() {
    return counterService.trigger("regisService").then((c) => "SER" + c);
  }
}
