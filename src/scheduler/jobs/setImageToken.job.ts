import { Job } from "agenda";
import moment from "moment-timezone";
import { Agenda } from "../agenda";
import { AritoHelper } from "../../helpers/arito.helper";

export class SetImageTokenJob {
  static jobName = "SetImageToken";
  static create(data: any) {
    return Agenda.create(this.jobName, data);
  }
  static execute(job: Job) {
    console.log("Execute Job " + SetImageTokenJob.jobName, moment().format());
    AritoHelper.setImageToken();
  }
}

export default SetImageTokenJob;
