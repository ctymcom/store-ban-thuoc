import { BaseModel, CrudRepository } from "./crud.repo";
import { Product } from "./product.repo";
export interface OrderItem extends BaseModel {
  productId: string;
  productCode: string;
  productName: string;
  unit: string;
  storeCode: string;
  qty: number;
  price: number;
  amount: number;
  factor: number;
  discountRate: number;
  discount: number;
  vatRate: number;
  vat: number;
  position: string;
  product: Product;
}

export class OrderItemRepository extends CrudRepository<OrderItem> {
  apiName: string = "OrderItem";
  shortFragment: string = this.parseFragment(`
    productId: ID
    productCode: String
    productName: String
    unit: String
    storeCode: String
    qty: Int
    price: Float
    amount: Float
    factor: Float
    discountRate: Float
    discount: Float
    vatRate: Float
    vat: Float
    position: Int
    product: Product{
      id: string
      createdAt: DateTime
      updatedAt: DateTime
      code: string
      name: string
      unit: string
      barcode: string
      basePrice: number
      salePrice: number
      image: string
    }
  `);
  fullFragment: string = this.parseFragment(`
    productId: ID
    productCode: String
    productName: String
    unit: String
    storeCode: String
    qty: Int
    price: Float
    amount: Float
    factor: Float
    discountRate: Float
    discount: Float
    vatRate: Float
    vat: Float
    position: Int
    product: Product{
      id: string
      createdAt: DateTime
      updatedAt: DateTime
      code: string
      name: string
      unit: string
      barcode: string
      basePrice: number
      salePrice: number
      image: string
    }
  `);
}

export const OrderItemService = new OrderItemRepository();
