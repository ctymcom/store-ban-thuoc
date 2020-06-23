import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Mutation {
    login(idToken: String): LoginData
  }

  type LoginData {
    token: String
  }

`;

export default schema;
