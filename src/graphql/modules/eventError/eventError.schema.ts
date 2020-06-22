import { gql } from 'apollo-server-express';
import { EventErrorStatusEnum } from '../../../constants';

const schema = gql`
  extend type Query {
    getAllEventError(q: QueryGetListInput): EventErrorPageData
    getOneEventError(id: ID!, q: QueryGetOneInput): EventError
  }

  extend type Mutation {
    resolveEventError(id: ID!): EventError
    resolveMultiEventError(ids: [ID]): Int
  }

  type EventError {
    id: String,
    type: String!,
    data: Mixed,
    """${Object.keys(EventErrorStatusEnum).join('|')}"""
    errorName: String
    errorStack: Mixed
    errorMessage: String
    status: String,
    createdAt: DateTime
    updatedAt: DateTime
  }

  type EventErrorPageData {
    data: [EventError],
    total: Int
    pagination: Pagination
  }
`;

export default schema;