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
  discountPayment?: number; // Tiền giảm giá thanh toán
  discountPoint?: number; // Tiền giảm giá từ điểm
  discountPointValue?: number; // Giá trị điểm giảm giá quy đổi
  vatRate: number;
  vat: number;
  position: string;
  product: Product;
}

export interface Order extends BaseModel {
  userId: string;
  code: number;
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
  usePoint: boolean;
  status: number;
  itemCount: number;
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
    itemCount: Int
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
    discountPayment: Float
    discountPoint: Float 
    discountPointValue: Float
    amount: Float
    promotionCode: String
    paymentMethod: String
    deliveryMethod: String
    usePoint: Boolean
    status: String
    itemCount: Int
  `);

  async completeOrder(orderId: string) {
    let res = await this.apollo.mutate({
      mutation: this.gql`
        mutation {
          g0: completeOrder(orderId: "${orderId}")
        }
      `,
    });
    return res.data.g0;
  }

  async rateOrder(orderId: string, reviewer: string, imark: number, content: string) {
    let res = await this.apollo.mutate({
      mutation: this.gql`
        mutation {
          g0: rateOrder(orderId: "${orderId}", reviewer: "${reviewer}", imark: ${imark}, content: "${content}")
        }
      `,
    });
    return res.data.g0;
  }
}

export const OrderService = new OrderRepository();
