import { GraphRepository } from "./graph.repo";
import { Product } from "./product.repo";

export interface MethodCheckout {
  id: string;
  code: string;
  name: string;
  name2: string;
  discountRate: number;
}
export interface Order {
  id: string;
  createdAt: string;
  updatedAt: string;
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
  items: [OrderItem];
  subtotal: number;
  discount: number;
  amount: number;
  promotionCode: string;
  paymentMethod: string;
  deliveryMethod: string;
  usePoint: Boolean;
  status: string;
}
type OrderItem = {
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
  position: number;
  product: Product;
};
export interface BankAccount {
  id: string;
  createdAt: string;
  updatedAt: string;
  unitID: string;
  account: string;
  bankAccount: string;
  accountOwner: string;
  bankName: string;
  bankName2: string;
  province: string;
  phone: string;
  fax: string;
  email: string;
  homePage: string;
  partner: string;
  taxCode: string;
  note: string;
  branch: string;
}

export class CheckoutMethodRepository extends GraphRepository {
  async getMethods(
    api: string
  ): Promise<
    {
      id: string;
      code: string;
      name: string;
      name2: string;
      discountRate: number;
    }[]
  > {
    const result = await this.apollo.query({
      query: this.gql`
      query {
        ${api}(
          q: { limit: 100 }
        ){
          data {
            id
            code
            name
            name2
            discountRate
          }
        }
      }
    `,
    });
    this.handleError(result);
    return result.data[api].data as any;
  }
  async getAllBankAccount(): Promise<BankAccount[]> {
    let api = "getAllBankAccount";
    const result = await this.apollo.query({
      query: this.gql`
      query {
        ${api}(
          q: { limit: 100 }
        ){
          data {
            id
            createdAt
            updatedAt
            unitID
            account
            bankAccount
            accountOwner
            bankName
            bankName
            province
            phone
            fax
            email
            homePage
            partner
            taxCode
            note
            branch
          }
        }
      }
    `,
    });
    this.handleError(result);
    return result.data[api].data as any;
  }
}

export const CheckoutService = new CheckoutMethodRepository();
