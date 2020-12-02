import { gql } from "apollo-server-express";

const schema = gql`
  extend type Query {
    getAllOrderItem(q: QueryGetListInput): OrderItemPageData
    getOneOrderItem(id: ID!): OrderItem
  }

  extend type Mutation {
    createOrderItem(data: CreateOrderItemInput!): OrderItem
    updateOrderItem(id: ID!, data: UpdateOrderItemInput!): OrderItem
    deleteOneOrderItem(id: ID!): OrderItem
    deleteManyOrderItem(ids: [ID]): Int
  }

  input CreateOrderItemInput {
    name: String
  }

  input UpdateOrderItemInput {
    name: String
  }

  type OrderItem {
    id: String
    name: String
    createdAt: DateTime
    updatedAt: DateTime
  }

  type OrderItemPageData {
    data: [OrderItem]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
