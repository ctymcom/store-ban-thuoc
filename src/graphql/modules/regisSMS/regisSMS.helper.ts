import { counterService } from "../counter/counter.service";
import { IRegisSMS } from "./regisSMS.model";

export class RegisSMSHelper {
  constructor(public regisSMS: IRegisSMS) {}

  static generateCode() {
    return counterService.trigger("regisSMS").then((c) => "SMS" + c);
  }
}
