import { ErrorHelper } from "../../../base/error";
import { firebaseHelper, UtilsHelper } from "../../../helpers";
import { ChatBotHelper } from "../../../helpers/chatbot.helper";
import { Context } from "../../context";
import { MemberModel } from "../member/member.model";
import { CustomerHelper } from "./customer.helper";
import { CustomerModel } from "./customer.model";

const Mutation = {
  loginCustomerByToken: async (root: any, args: any, context: Context) => {
    const { idToken, psid, pageId } = args;
    let decode = await firebaseHelper.verifyIdToken(idToken);
    let phone = decode.phone_number;
    if (!phone) throw ErrorHelper.badToken();
    const member = await MemberModel.findOne({ fanpageId: pageId });
    if (!member || !member.chatbotKey) throw ErrorHelper.permissionDeny();
    phone = UtilsHelper.parsePhone(phone, "0");
    let customer = await CustomerModel.findOne({
      $or: [{ phone }, { "pageAccounts.psid": psid }],
    });
    if (customer && customer.uid != decode.uid)
      throw ErrorHelper.requestDataInvalid(
        "Số điện thoại tồn tại ở một tài khoản khác.\n Hoặc tài khoản facebook đã đăng ký tài khoản khác."
      );
    if (!customer) {
      const chatbotHelper = new ChatBotHelper(member.chatbotKey);
      const subscriberInfo = await chatbotHelper.getSubscriber(psid);
      customer = new CustomerModel({
        code: await CustomerHelper.generateCode(), // Mã khách hàng
        name: subscriberInfo.name,
        facebookName: subscriberInfo.name,
        uid: decode.uid,
        phone: phone,
        avatar: subscriberInfo.profilePic,
        gender: subscriberInfo.gender,
        pageAccounts: [],
      });
    }

    if (!customer.pageAccounts.find((a) => a.psid == psid)) {
      customer.pageAccounts.push({
        memberId: member._id,
        pageId: member.fanpageId,
        psid: psid,
      });
    }
    return {
      customer: await customer.save(),
      token: new CustomerHelper(customer).getToken(),
    };
  },
};

export default { Mutation };
