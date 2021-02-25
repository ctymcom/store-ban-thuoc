// Repeat Hello World

import moment from "moment-timezone";
import SyncLocationDataJob from "./jobs/syncLocationData.job";
import { SyncProductJob } from "./jobs/syncProduct.job";
import SyncUserNotificationJob from "./jobs/syncUserNotification.job";

export function InitRepeatJobs() {
  console.log("Generate Repeat Jobs");
  SyncProductJob.create({}).repeatEvery("5 minute").unique({ name: SyncProductJob.jobName }).save();
  SyncLocationDataJob.create({})
    .repeatEvery("1 days")
    .unique({ name: SyncLocationDataJob.jobName })
    .save();
  SyncUserNotificationJob.create({})
    .repeatEvery("5 minute")
    .unique({ name: SyncUserNotificationJob.jobName })
    .save();
}
