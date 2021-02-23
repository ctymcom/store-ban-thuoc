import { gql } from "apollo-server-express";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";

export default {
  schema: gql`
    extend type Mutation {
      regisAritoUser(nickname: String!, email: String!, phone: String!): String
    }
  `,
  resolver: {
    Mutation: {
      regisAritoUser: async (root: any, args: any, context: Context) => {
        const { nickname, email, phone } = args;
        return await AritoHelper.register({ nickname, email, phone });
      },
    },
  },
};
