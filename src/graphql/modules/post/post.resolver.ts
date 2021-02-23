import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { postService } from "./post.service";
import KhongDau from "khong-dau";
import { PostModel, PostStatus } from "./post.model";
import { random, set } from "lodash";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { TagLoader } from "../tag/tag.model";

const Query = {
  getAllPost: async (root: any, args: any, context: Context) => {
    // AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    if (!context.isEditor) {
      set(args, "q.filter.status", PostStatus.PUBLIC);
      set(args, "q.filter.publishedAt", { $lte: new Date() });
    }
    return postService.fetch(args.q);
  },
  getOnePost: async (root: any, args: any, context: Context) => {
    // AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    const { id } = args;
    return await postService.findOne({ _id: id });
  },
};

const Mutation = {
  createPost: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { data } = args;
    if (!data.slug) {
      data.slug = KhongDau(data.title).toLowerCase().trim().replace(/\ +/g, "-");
      if ((await PostModel.count({ slug: data.slug })) > 0) {
        data.slug += "-" + random(1000, 9999);
      }
    }
    if (!data.priority) {
      data.priority = await PostModel.find()
        .sort({ priority: -1 })
        .limit(1)
        .exec()
        .then((res) => {
          if (res.length == 0) return 0;
          return res[0].priority + 1;
        });
    }
    return await postService.create(data);
  },
  updatePost: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    return await postService.updateOne(id, data);
  },
  deleteOnePost: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await postService.deleteOne(id);
  },
};

const Post = {
  tags: GraphQLHelper.loadManyById(TagLoader, "tagIds"),
};

export default {
  Query,
  Mutation,
  Post,
};
