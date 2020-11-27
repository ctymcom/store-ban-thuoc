import { set } from "lodash";

import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { MemberHelper } from "../member/member.helper";
import { CommissionLogType, ICommissionLog } from "./commissionLog.model";
import { commissionLogService } from "./commissionLog.service";

const Query = {
  getAllCommissionLog: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);
    const memberHelper = await MemberHelper.fromContext(context);
    if (memberHelper) {
      set(args, "q.filter.memberId", memberHelper.member._id);
    }
    return commissionLogService.fetch(args.q);
  },
};

const CommissionLog = {
  note: async (root: ICommissionLog, args: any, context: Context) => {
    switch (root.type) {
      case CommissionLogType.RECEIVE_FROM_ORDER:
        return "Nhận từ đơn hàng";
      default:
        return "";
    }
  },
};

export default {
  Query,
  CommissionLog,
};
