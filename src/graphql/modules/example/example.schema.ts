import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    getAllExample: [Example]
    getOneExample(id: ID!): Example
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
    createdAt: DateTime
    updatedAt: DateTime
  }

  type ExamplePageData {
    data: [Example]
  }
`;

export default schema;
