import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllProductCountry(q: QueryGetListInput): ProductCountryPageData
    # Add Query
  }

  type ProductCountry {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã quốc gia"
    code: String
    "Tên quốc gia"
    name: String
    "Tên quốc gia tiếng anh"
    name2: String
  }

  type ProductCountryPageData {
    data: [ProductCountry]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
