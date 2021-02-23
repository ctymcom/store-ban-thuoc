import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { tagService } from "./tag.service";
import KhongDau from "khong-dau";
import { TagModel } from "./tag.model";
import { random } from "lodash";
const Query = {
  getAllTag: async (root: any, args: any, context: Context) => {
    // AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    return tagService.fetch(args.q);
  },
  getOneTag: async (root: any, args: any, context: Context) => {
    // AuthHelper.acceptRoles(context, [ROLES.ADMIN, ROLES.EDITOR]);
    const { id } = args;
    return await tagService.findOne({ _id: id });
  },
};

const Mutation = {
  createTag: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { data } = args;
    if (!data.slug) {
      data.slug = KhongDau(data.name).toLowerCase().trim().replace(/\ +/g, "-");
      if ((await TagModel.count({ slug: data.slug })) > 0) {
        data.slug += "-" + random(1000, 9999);
      }
    }
    return await tagService.create(data);
  },
  updateTag: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    return await tagService.updateOne(id, data);
  },
  deleteOneTag: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await tagService.deleteOne(id);
  },
};

const Tag = {};

export default {
  Query,
  Mutation,
  Tag,
};
