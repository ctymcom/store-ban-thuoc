import { ROLES } from "../../../constants/role.const";
import { AuthHelper } from "../../../helpers";
import { ChatBotHelper } from "../../../helpers/chatbot.helper";
import { Context } from "../../context";
import { MemberModel } from "./member.model";

const Mutation = {
  connectChatbot: async (root: any, args: any, context: Context) => {
    AuthHelper.acceptRoles(context, [ROLES.MEMBER]);
    const { apiKey } = args;
    const chatbotHelper = new ChatBotHelper(apiKey);
    const pageData = await chatbotHelper.getPageInfo();
    const member = await MemberModel.findById(context.tokenData._id);
    member.fanpageId = pageData.pageId;
    member.fanpageName = pageData.pageName;
    member.fanpageImage = pageData.picture;
    member.chatbotKey = apiKey;
    return await member.save();
  },
};

export default { Mutation };
