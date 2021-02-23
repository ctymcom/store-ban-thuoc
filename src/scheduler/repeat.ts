// Repeat Hello World

import moment from "moment-timezone";
import SetImageTokenJob from "./jobs/setImageToken.job";
import SyncLocationDataJob from "./jobs/syncLocationData.job";
import { SyncProductJob } from "./jobs/syncProduct.job";
import SyncProductTabJob from "./jobs/syncProductTab.job";

export function InitRepeatJobs() {
  console.log("Generate Repeat Jobs");
  SetImageTokenJob.create({})
    .repeatEvery("5 minute")
    .unique({ name: SetImageTokenJob.jobName })
    .save();
  SyncProductJob.create({}).repeatEvery("5 minute").unique({ name: SyncProductJob.jobName }).save();
  SyncProductTabJob.create({})
    .repeatEvery("5 minute")
    .unique({ name: SyncProductTabJob.jobName })
    .save();
  SyncLocationDataJob.create({})
    .repeatEvery("1 days")
    .unique({ name: SyncLocationDataJob.jobName })
    .save();
}
