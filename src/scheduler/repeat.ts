// Repeat Hello World

import moment from "moment-timezone";
import SetImageTokenJob from "./jobs/setImageToken.job";
import { SyncProductJob } from "./jobs/syncProduct.job";

export function InitRepeatJobs() {
  console.log("Generate Repeat Jobs");
  SetImageTokenJob.create({})
    .repeatEvery("5 minute")
    .unique({ name: SetImageTokenJob.jobName })
    .save();
  SyncProductJob.create({}).repeatEvery("5 minute").unique({ name: SyncProductJob.jobName }).save();
}