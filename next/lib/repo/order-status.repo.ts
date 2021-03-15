import { BaseModel, CrudRepository } from "./crud.repo";

export interface OrderStatus extends BaseModel {
  code: number;
  name: string;
  name2: string;
  position: number;
}

export class OrderStatusRepository extends CrudRepository<OrderStatus> {
  apiName = "OrderStatus";
  shortFragment = this.parseFragment(`
    id: String
    code: Int
    name: String
    name2: String
    position: Int
  `);
  fullFragment = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    code: Int
    name: String
    name2: String
    position: Int
  `);
}

export const OrderStatusService = new OrderStatusRepository();
