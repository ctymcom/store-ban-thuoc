import { set } from "lodash";
import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { Context } from "../../context";
import { CumulativePointLogType, ICumulativePointLog } from "./cumulativePointLog.model";
import { cumulativePointLogService } from "./cumulativePointLog.service";

const Query = {
  getAllCumulativePointLog: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, ROLES.ADMIN_EDITOR_MEMBER);
    if (context.tokenData.role == ROLES.MEMBER) {
      set(args, "q.filter.memberId", context.tokenData._id);
    }
    return cumulativePointLogService.fetch(args.q);
  },
};

const CumulativePointLog = {
  note: async (root: ICumulativePointLog, args: any, context: Context) => {
    switch (root.type) {
      case CumulativePointLogType.RECEIVE_FROM_ORDER:
        return "Nhận từ đơn hàng";
      case CumulativePointLogType.RECEIVE_FROM_INVITE:
        return "Nhận từ mời thành viên";
      default:
        return "";
    }
  },
};

export default {
  Query,
  CumulativePointLog,
};
