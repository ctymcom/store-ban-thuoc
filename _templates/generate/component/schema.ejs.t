---
to: src/graphql/modules/<%= h.inflection.camelize(name, true) %>/<%= h.inflection.camelize(name, true) %>.schema.ts
---
import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    getAll<%= h.inflection.camelize(name) %>(q: QueryGetListInput): <%= h.inflection.camelize(name) %>PageData
    getOne<%= h.inflection.camelize(name) %>(id: ID!, q: QueryGetOneInput): <%= h.inflection.camelize(name) %>
  }

  extend type Mutation {
    create<%= h.inflection.camelize(name) %>(data: Create<%= h.inflection.camelize(name) %>Input!): <%= h.inflection.camelize(name) %>,
    update<%= h.inflection.camelize(name) %>(id: ID!, data: Update<%= h.inflection.camelize(name) %>Input!): <%= h.inflection.camelize(name) %>,
    deleteOne<%= h.inflection.camelize(name) %>(id: ID!): <%= h.inflection.camelize(name) %>,
    deleteMany<%= h.inflection.camelize(name) %>(ids: [ID]): Int,
  }

  input Create<%= h.inflection.camelize(name) %>Input {
  }

  input Update<%= h.inflection.camelize(name) %>Input {
  }

  type <%= h.inflection.camelize(name) %> {
    id: String,
    createdAt: DateTime
    updatedAt: DateTime
  }

  type <%= h.inflection.camelize(name) %>PageData {
    data: [<%= h.inflection.camelize(name) %>],
    total: Int
    pagination: Pagination
  }
`;

export default schema;
