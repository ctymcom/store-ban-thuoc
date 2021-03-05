import { gql } from "apollo-server-express";
import { AritoHelper } from "../../../helpers/arito/arito.helper";
import { Context } from "../../context";

export default {
  schema: gql`
    extend type Mutation {
      recoveryPassword(email: String!): String
    }
  `,
  resolver: {
    Mutation: {
      recoveryPassword: async (root: any, args: any, context: Context) => {
        return await AritoHelper.recoveryPassword(args.email);
      },
    },
  },
};
