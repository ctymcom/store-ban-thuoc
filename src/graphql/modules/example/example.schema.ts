import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    getAllExample(q: QueryGetListInput): ExamplePageData
    getOneExample(id: ID!, q: QueryGetOneInput): Example
  }

  extend type Mutation {
    createExample(data: CreateExampleInput!): Example,
    updateExample(id: ID!, data: UpdateExampleInput!): Example,
    deleteOneExample(id: ID!): Example,
    deleteManyExample(ids: [ID]): Int,
  }

  input CreateExampleInput {
    name: String
    exampleId: String
  }

  input UpdateExampleInput {
    name: String
    exampleId: String    
  }

  type Example {
    id: String,
    name: String,
    exampleId: String
    example: Example
    createdAt: DateTime
    updatedAt: DateTime
  }

  type ExamplePageData {
    data: [Example],
    total: Int
    pagination: Pagination
  }
`;

export default schema;
