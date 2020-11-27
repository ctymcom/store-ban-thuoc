import Axios from "axios";
import { get } from "lodash";

import { ErrorHelper } from "../base/error";
import { configs } from "../configs";
import { Gender } from "../graphql/modules/member/member.model";

const host = `${configs.chatbot.host}/api/v1`;
export class ChatBotHelper {
  public token: string;
  constructor(public apiKey: string) {
    const [type, id, token] = apiKey.split("|");
    this.token = token;
    console.log("type", [type, id]);
  }
  static async decodeSignedRequest(signedRequest: string) {
    return Axios.post(
      `${host}/app/messengerSignDecode`,
      { signedRequest },
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => {
        const tokenData = get(res.data, "results.object");
        if (!tokenData) throw ErrorHelper.badToken();
        return {
          pageId: tokenData.page_id,
          psid: tokenData.psid,
          threadId: tokenData.tid,
        } as MessengerTokenDecoded;
      })
      .catch((err) => {
        throw ErrorHelper.badToken();
      });
  }
  async sendTextMessage(psids: string[], message: string) {
    Axios.post(
      `${host}/send`,
      {
        type: "new_story",
        story: [{ type: "text", option: { text: message } }],
        sendBy: "psid",
        sendTo: psids,
        nonTask: true,
      },
      { headers: { "Content-Type": "application/json", "x-api-key": this.apiKey } }
    ).catch((err: any) => console.log("Gửi tin nhắn lỗi ", err.message));
  }
  async sendStoryByRef(psids: string[], ref: string, context: any) {
    Axios.post(
      `${host}/send`,
      {
        type: "ref",
        story: ref,
        sendBy: "psid",
        sendTo: psids,
        context: context,
        nonTask: true,
      },
      { headers: { "Content-Type": "application/json", "x-api-key": this.apiKey } }
    ).catch((err: any) => console.log("Gửi tin nhắn lỗi ", err.message, ref));
  }
  async getPageInfo() {
    return Axios.get(`${host}/page`, {
      params: { fields: ["$all"] },
      headers: { "Content-Type": "application/json", "x-api-key": this.apiKey },
    }).then((res) => {
      const pageData = get(res.data, "results.objects.rows.0");
      if (!pageData) throw ErrorHelper.requestDataInvalid("Api Key Không hợp lệ");
      return {
        id: pageData._id,
        appId: pageData.app,
        pageId: get(pageData, "meta.id"),
        pageName: get(pageData, "meta.name"),
        picture: get(pageData, "meta.picture.data.url"),
      } as PageInfo;
    });
  }
  async getSubscriber(psid: string) {
    return Axios.get(`${host}/subscriber`, {
      params: { fields: ["messengerProfile", "_id"], filter: JSON.stringify({ psid }) },
      headers: { "Content-Type": "application/json", "x-api-key": this.apiKey },
    }).then((res) => {
      const subscriber = get(res.data, "results.objects.rows.0");
      if (!subscriber) throw ErrorHelper.requestDataInvalid("Api Key Không hợp lệ");
      return {
        id: subscriber._id,
        psid: subscriber.messengerProfile.psid,
        name: subscriber.messengerProfile.name,
        firstName: subscriber.messengerProfile.first_name,
        lastName: subscriber.messengerProfile.last_name,
        gender: subscriber.messengerProfile.gender,
        locale: subscriber.messengerProfile.locale,
        profilePic: subscriber.messengerProfile.profile_pic,
      } as SubscriberInfo;
    });
  }
}

export type PageInfo = {
  id: string;
  appId: string;
  pageId: string;
  pageName: string;
  picture: string;
};

export type MessengerTokenDecoded = {
  pageId: string;
  psid: string;
  threadId: string;
};

export type SubscriberInfo = {
  id: string;
  psid: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  locale: string;
  profilePic: string;
};
