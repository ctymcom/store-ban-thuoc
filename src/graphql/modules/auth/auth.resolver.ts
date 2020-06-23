import _ from "lodash";

import { Context } from "../../context";
import { ParseQueryHelper, firebaseHelper } from "../../../helpers";
// import { exampleEvent } from "../../../events";
import { TokenHelper } from "../../../helpers/token.helper";

const Mutation = {
  login: async (root: any, args: any, context: Context) => {
    const { idToken } = args;

    let decode = await firebaseHelper.verifyIdToken(idToken);

    return {
      user: decode,
      token: TokenHelper.getAdministratorToken(),
    };
  }
};


export default {
  Mutation,
};