// Repeat Hello World

import moment from "moment-timezone";
import { configs } from "../configs";
import SyncAritoOptionsJob from "./jobs/syncAritoOptions.job";
import SyncBankAccountJob from "./jobs/syncBankAccount.job";
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
  SyncProductJob.create({ flag: 0 })
    .repeatEvery("5 minute", { skipImmediate: true })
    .unique({ name: SyncProductJob.jobName, "data.flag": 0 })
    .save();
  // .then((res) => res.run());
  SyncProductJob.create({ flag: 1 })
    .repeatEvery("0 0 * * *", { skipImmediate: true, timezone: configs.timezone })
    .unique({ name: SyncProductJob.jobName, "data.flag": 1 })
    .save();
  // .then((res) => res.run());
  SyncLocationDataJob.create({})
    .repeatEvery("1 days", { skipImmediate: true })
    .unique({ name: SyncLocationDataJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncUserNotificationJob.create({})
    .repeatEvery("5 minute", { skipImmediate: true })
    .unique({ name: SyncUserNotificationJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncPromotionJob.create({})
    .repeatEvery("6 minute", { skipImmediate: true })
    .unique({ name: SyncPromotionJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncAritoOptionsJob.create({})
    .repeatEvery("7 minute", { skipImmediate: true })
    .unique({ name: SyncAritoOptionsJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncOrderStatusJob.create({})
    .repeatEvery("5 minute", { skipImmediate: true })
    .unique({ name: SyncOrderStatusJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncOrderOptionsJob.create({})
    .repeatEvery("5 minute", { skipImmediate: true })
    .unique({ name: SyncOrderOptionsJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncOrderJob.create({})
    .repeatEvery("5 minute", { skipImmediate: true })
    .unique({ name: SyncOrderJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncUserPointLogJob.create({})
    .repeatEvery("5 minute", { skipImmediate: true })
    .unique({ name: SyncUserPointLogJob.jobName })
    .save();
  // .then((res) => res.run());
  SyncBankAccountJob.create({})
    .repeatEvery("5 minute", { skipImmediate: true })
    .unique({ name: SyncBankAccountJob.jobName })
    .save()
    .then((res) => res.run());
}
