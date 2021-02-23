import _, { get } from "lodash";
import { AuthHelper } from "../helpers";
import { TokenHelper } from "../helpers/token.helper";
import { TokenExpiredError } from "jsonwebtoken";
import { ROLES } from "../constants/role.const";
import { ChatBotHelper, MessengerTokenDecoded } from "../helpers/chatbot.helper";
export type TokenData = {
  role: string;
  _id: string;
  [name: string]: string;
};
export type SignedRequestPayload = {
  psid: string;
  algorithm: string;
  thread_type: string;
  tid: string;
  issued_at: number;
  page_id: number;
};
export class Context {
  req: Request;
  constructor(
    public isAuth: boolean = false,
    public isTokenExpired: boolean = false,
    public tokenData?: TokenData,
    public messengerSignPayload?: MessengerTokenDecoded
  ) {}

  get isEditor() {
    return get(this.tokenData, "role") == ROLES.EDITOR;
  }
  isMember() {
    return get(this.tokenData, "role") == ROLES.MEMBER;
  }
  isCustomer() {
    return get(this.tokenData, "role") == ROLES.CUSTOMER;
  }
  isMessenger() {
    return get(this.tokenData, "role") == ROLES.MESSENGER;
  }
  get id() {
    return get(this.tokenData, "_id");
  }
  get ua() {
    return get(this, "req.headers.user-agent");
  }
  get ip() {
    return get(this, "req.headers.x-forwarded-for") || get(this, "req.headers.remoteAddress");
  }
  parseToken(params: any) {
    try {
      const { req, connection } = params;
      let token;

      if (req) {
        this.req = req;
        token = _.get(req, "headers.x-token") || _.get(req, "query.x-token");
      }
      if (connection && connection.context) {
        token = connection.context["x-token"];
      }

      if (token) {
        const decodedToken: any = TokenHelper.decodeToken(token);
        this.isAuth = true;
        this.tokenData = decodedToken;
      }
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        this.isTokenExpired = true;
      }
      this.isAuth = false;
    } finally {
      return this;
    }
  }

  async parseSig(params: any) {
    try {
      const { req, connection } = params;
      let sig;
      let psid;
      if (req) {
        this.req = req;
        sig = _.get(req, "headers.x-sig") || _.get(req, "query.x-sig");
        psid = _.get(req, "headers.x-psid") || _.get(req, "query.x-psid");
      }
      if (connection && connection.context) {
        sig = connection.context["x-sig"];
        psid = connection.context["x-psid"];
      }

      if (sig) {
        const signPayload = await ChatBotHelper.decodeSignedRequest(sig);
        signPayload.psid = !signPayload.psid || signPayload.psid == "" ? psid : signPayload.psid;
        this.messengerSignPayload = signPayload;
        this.isAuth = true;

        this.tokenData = { _id: this.messengerSignPayload.psid, role: ROLES.MESSENGER };
      }
    } catch (err) {
    } finally {
      return this;
    }
  }
  auth(roles: string[]) {
    AuthHelper.acceptRoles(this, roles);
  }
}

export async function onContext(params: any) {
  let context: Context = new Context();
  await context.parseSig(params);
  context.parseToken(params);
  return context;
}
