import { BaseModel, CrudRepository } from "./crud.repo";
import { OrderItem } from "./order-item.repo";

export interface Order extends BaseModel {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  code: string;
  orderNumber: string;
  addressId: string;
  fullAddress: string;
  contactName: string;
  address: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  phone: string;
  location: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  amount: number;
  promotionCode: string;
  paymentMethod: string;
  deliveryMethod: string;
  usePoint: Boolean;
  status: number;
}

export class OrderRepository extends CrudRepository<Order> {
  apiName = "Order";
  shortFragment = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    userId: String
    code: Int
    orderNumber: String
    addressId: String
    fullAddress: String
    contactName: String
    address: String
    provinceId: String
    districtId: String
    wardId: String
    phone: String
    location: String
    items { productId productCode productName storeCode qty price amount }: [OrderItem]
    subtotal: Float
    discount: Float
    amount: Float
    promotionCode: String
    paymentMethod: String
    deliveryMethod: String
    usePoint: Boolean
    status: String
  `);
  fullFragment = this.parseFragment(`
    id: String
    createdAt: DateTime
    updatedAt: DateTime
    userId: String
    code: Int
    orderNumber: String
    addressId: String
    fullAddress: String
    contactName: String
    address: String
    provinceId: String
    districtId: String
    wardId: String
    phone: String
    location: String
    items {
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
      product {
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
      }: Product 
    }: [OrderItem]
    subtotal: Float
    discount: Float
    amount: Float
    promotionCode: String
    paymentMethod: String
    deliveryMethod: String
    usePoint: Boolean
    status: String
  `);
}

export const OrderService = new OrderRepository();
