import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllOrder(q: QueryGetListInput): OrderPageData
    getOneOrder(id: ID!): Order
  }

  extend type Mutation {
    createOrder(data: CreateOrderInput!): Order
    updateOrder(id: ID!, data: UpdateOrderInput!): Order
    deleteOneOrder(id: ID!): Order
    deleteManyOrder(ids: [ID]): Int
  }

  input CreateOrderInput {
    name: String
  }

  input UpdateOrderInput {
    name: String
  }

  type Order {
    id: String
    name: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type OrderPageData {
    data: [Order]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
