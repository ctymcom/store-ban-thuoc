import { BaseModel, CrudRepository } from "./crud.repo";
import { OrderItem } from "./order-item.repo";

export interface OrderStatus extends BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  name: string;
  name2: string;
  position: string;
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
