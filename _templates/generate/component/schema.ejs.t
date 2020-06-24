---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.schema.ts
---
import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllh.inflection.camelize(name) %>(q: QueryGetListInput): h.inflection.camelize(name) %>PageData
    getOneh.inflection.camelize(name) %>(id: ID!): h.inflection.camelize(name) %>
  }

  extend type Mutation {
    createh.inflection.camelize(name) %>(data: Createh.inflection.camelize(name) %>Input!): h.inflection.camelize(name) %>
    updateh.inflection.camelize(name) %>(id: ID!, data: Updateh.inflection.camelize(name) %>Input!): h.inflection.camelize(name) %>
    deleteOneh.inflection.camelize(name) %>(id: ID!): h.inflection.camelize(name) %>
    deleteManyh.inflection.camelize(name) %>(ids: [ID]): Int
  }

  input Createh.inflection.camelize(name) %>Input {
    name: String
    h.inflection.camelize(name, true) %>Id: String
  }

  input Updateh.inflection.camelize(name) %>Input {
    name: String
    h.inflection.camelize(name, true) %>Id: String
  }

  type h.inflection.camelize(name) %> {
    id: String
    name: String
    h.inflection.camelize(name, true) %>Id: String
    h.inflection.camelize(name, true) %>: h.inflection.camelize(name) %>
    createdAt: DateTime
    updatedAt: DateTime
  }

  type h.inflection.camelize(name) %>PageData {
    data: [h.inflection.camelize(name) %>]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
