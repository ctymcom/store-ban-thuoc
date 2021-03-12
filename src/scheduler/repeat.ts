// Repeat Hello World

import moment from "moment-timezone";
import SyncAritoOptionsJob from "./jobs/syncAritoOptions.job";
import SyncLocationDataJob from "./jobs/syncLocationData.job";
import SyncOrderJob from "./jobs/syncOrder.job";
import SyncOrderOptionsJob from "./jobs/syncOrderOptions.job";
import SyncOrderStatusJob from "./jobs/syncOrderStatus.job";
import { SyncProductJob } from "./jobs/syncProduct.job";
import SyncPromotionJob from "./jobs/syncPromotion.job";
import SyncUserNotificationJob from "./jobs/syncUserNotification.job";
import SyncUserPointLogJob from "./jobs/syncUserPointLog.job";

export function InitRepeatJobs() {
  console.log("Generate Repeat Jobs");
  SyncProductJob.create({})
    .repeatEvery("5 minute")
    .unique({ name: SyncProductJob.jobName })
    .save()
    .then((job) => job.run());
  SyncLocationDataJob.create({})
    .repeatEvery("1 days")
    .unique({ name: SyncLocationDataJob.jobName })
    .save();
  SyncUserNotificationJob.create({})
    .repeatEvery("5 minute")
    .unique({ name: SyncUserNotificationJob.jobName })
    .save();
  SyncPromotionJob.create({})
    .repeatEvery("6 minute")
    .unique({ name: SyncPromotionJob.jobName })
    .save();
  SyncAritoOptionsJob.create({})
    .repeatEvery("7 minute")
    .unique({ name: SyncAritoOptionsJob.jobName })
    .save();
  SyncOrderStatusJob.create({})
    .repeatEvery("1 day")
    .unique({ name: SyncOrderStatusJob.jobName })
    .save();
  SyncOrderOptionsJob.create({})
    .repeatEvery("1 day")
    .unique({ name: SyncOrderOptionsJob.jobName })
    .save();
  SyncOrderJob.create({}).repeatEvery("5 minute").unique({ name: SyncOrderJob.jobName }).save();
  SyncUserPointLogJob.create({})
    .repeatEvery("5 minute")
    .unique({ name: SyncUserPointLogJob.jobName })
    .save();
}
