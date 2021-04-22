import { gql } from "apollo-server-express";
import { set } from "lodash";
import { Context } from "../../context";
import { notificationService } from "./notification.service";

export default {
  schema: gql`
    extend type Query {
      getAllNotification0(q: QueryGetListInput): NotificationPageData
    }
  `,
  resolver: {
    Query: {
      getAllNotification0: async (root: any, args: any, context: Context) => {
        set(args, "q.filter.userId", 0);
        return notificationService.fetch(args.q);
      },
    },
  },
};
