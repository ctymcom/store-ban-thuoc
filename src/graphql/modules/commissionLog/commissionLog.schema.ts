import { gql } from "apollo-server-express";
import { CommissionLogType } from "./commissionLog.model";

const schema = gql`
  extend type Query {
    getAllCommissionLog(q: QueryGetListInput): CommissionLogPageData
  }

  type CommissionLog {
    id: String
    createdAt: DateTime
    updatedAt: DateTime

    "Mã thành viên"
    memberId: ID
    "Giá trị"
    value: Float
    "Loại sự kiện ${Object.values(CommissionLogType)}"
    type: String
    "Mã đơn hàng"
    orderId: ID

    "Ghi chú"
    note: String
  }

  type CommissionLogPageData {
    data: [CommissionLog]
    total: Int
    pagination: Pagination
  }
`;

export default schema;
