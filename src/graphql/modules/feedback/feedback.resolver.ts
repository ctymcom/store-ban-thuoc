import { ROLES } from "../../../constants/role.const";
import { Context } from "../../context";
import { feedbackService } from "./feedback.service";

const Query = {
  getAllFeedback: async (root: any, args: any, context: Context) => {
    return feedbackService.fetch(args.q);
  },
  getOneFeedback: async (root: any, args: any, context: Context) => {
    const { id } = args;
    return await feedbackService.findOne({ _id: id });
  },
};

const Mutation = {
  createFeedback: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { data } = args;
    return await feedbackService.create(data);
  },
  updateFeedback: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    return await feedbackService.updateOne(id, data);
  },
  deleteOneFeedback: async (root: any, args: any, context: Context) => {
    context.auth(ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await feedbackService.deleteOne(id);
  },
};

const Feedback = {};

export default {
  Query,
  Mutation,
  Feedback,
};
