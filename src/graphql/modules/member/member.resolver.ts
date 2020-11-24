import { ROLES } from "../../../constants/role.const";
import { AuthHelper, ErrorHelper, firebaseHelper, UtilsHelper } from "../../../helpers";
import { GraphQLHelper } from "../../../helpers/graphql.helper";
import { Context } from "../../context";
import { AddressHelper } from "../address/address.helper";
import { BranchLoader } from "../branch/branch.model";
import { MemberHelper } from "./member.helper";
import { MemberModel } from "./member.model";
import { memberService } from "./member.service";

const Query = {
  getAllMember: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    return memberService.fetch(args.q);
  },
  getOneMember: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await memberService.findOne({ _id: id });
  },
};

const Mutation = {
  createMember: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { data } = args;
    if (!UtilsHelper.isEmail(data.username))
      throw ErrorHelper.createUserError("email không đúng định dạng");
    if (data.password.length < 6)
      throw ErrorHelper.createUserError("mật khẩu phải có ít nhất 6 ký tự");
    const member = await MemberModel.findOne({ username: data.username });
    if (member) {
      throw ErrorHelper.createUserError("Tên tài khoản này đã tồn tại");
    }

    const fbUser = await firebaseHelper.createUser(data.username, data.password);
    data.uid = fbUser.uid;
    delete data.password;
    const helper = new MemberHelper(new MemberModel(data));
    await Promise.all([
      AddressHelper.setProvinceName(helper.member),
      AddressHelper.setDistrictName(helper.member),
      AddressHelper.setWardName(helper.member),
    ]);
    helper.setActivedAt();
    return await helper.member.save();
  },
  updateMember: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id, data } = args;
    return await memberService.updateOne(id, data).then(async (res) => {
      const helper = new MemberHelper(res);
      await Promise.all([
        AddressHelper.setProvinceName(helper.member),
        AddressHelper.setDistrictName(helper.member),
        AddressHelper.setWardName(helper.member),
      ]);
      helper.setActivedAt();
      return await helper.member.save();
    });
  },
  deleteOneMember: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR);
    const { id } = args;
    return await memberService.deleteOne(id);
  },
  deleteManyMember: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.ADMIN]);
    const { ids } = args;
    let result = await memberService.deleteMany(ids);
    return result;
  },
};

const Member = {
  branch: GraphQLHelper.loadById(BranchLoader, "branchId"),
};

export default {
  Query,
  Mutation,
  Member,
};
