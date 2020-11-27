import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllReportCode: Mixed
    getReportData(option: Mixed, code: String!): Mixed
  }

  type Report {
    charts: Mixed
  }
`;

export default schema;
