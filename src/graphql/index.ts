import { ApolloServer, gql } from "apollo-server-express";
import { Express } from "express";
import _ from "lodash";
import path from "path";
import GraphQLDateTime from "graphql-type-datetime";

import { Server } from "http";
import minifyGql from "minify-graphql-loader";
import { configs } from "../configs";
import { onContext } from "./context";
import { UtilsHelper, ErrorHelper } from "../helpers";
export default (app: Express, httpServer: Server) => {
  const typeDefs = [
    gql`
      scalar Mixed
      scalar DateTime

      type Query {
        _empty: String
      }
      type Mutation {
        _empty: String
      }
      type Subscription {
        _empty: String
      }
      input QueryInput {
        limit: Int
        offset: Int
        page: Int
        order: [[String]]
        join: [JoinInput]
        filter: Mixed
        search: String
      }
      type Pagination {
        next: Int
        prev: Int
        total: Int
      }

      input JoinInput {
        association: String
        include: [JoinInput]
      }
    `,
  ];

  let resolvers = {
    DateTime: GraphQLDateTime,
  };
  let defaultFragment: any = {};

  const ModuleFiles = UtilsHelper.walkSyncFiles(path.join(__dirname, "modules"));
  ModuleFiles.filter((f: any) => /(.*).schema.js$/.test(f)).map((f: any) => {
    const { default: schema } = require(f);
    typeDefs.push(schema);
  });
  ModuleFiles.filter((f: any) => /(.*).resolver.js$/.test(f)).map((f: any) => {
    const { default: resolver } = require(f);
    resolvers = _.merge(resolvers, resolver);
  });
  ModuleFiles.filter((f: any) => /(.*).fragment.js$/.test(f)).map((f: any) => {
    const { default: fragment } = require(f);
    defaultFragment = _.merge(defaultFragment, fragment);
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true,
    context: onContext,
    debug: configs.debug,
    formatError(err) {
      if (err.extensions && !err.extensions.exception.info) {
        ErrorHelper.logUnknowError(err);
      }
      return err;
    },
    subscriptions: {
      onConnect: (connectionParams, webSocket) => connectionParams,
    },
  });

  const defaultFragmentFields = Object.keys(defaultFragment);
  app.use("/graphql", (req, res, next) => {
    // if (req.body && req.body.query) {
    //   let minify = minifyGql(req.body.query);
    //   for (const field of defaultFragmentFields) {
    //     minify = minify.replace(
    //       new RegExp(field + "( |})", "g"),
    //       field + defaultFragment[field] + "$1"
    //     );
    //   }
    //   req.body.query = minify;
    // }
    next();
  });

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: (origin, callback) => {
        callback(null, true);

        // const whitelist = WHITE_LIST_DOMAINS;
        // if (!origin || whitelist.findIndex((domain) => origin.startsWith(domain)) !== -1) {
        //   callback(null, true);
        // } else {
        //   callback(new Error('Not allowed by CORS'));
        // }
      },
    },
  });
  server.installSubscriptionHandlers(httpServer);

  console.log(
    `\n Running Apollo Server on Path: ${configs.domain}${server.graphqlPath}`
  );
};
