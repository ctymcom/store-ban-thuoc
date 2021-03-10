import { GraphRepository } from "./graph.repo";

export interface MethodCheckout {
  id: string;
  code: string;
  name: string;
  name2: string;
  discountRate: number;
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
}

export const CheckoutService = new CheckoutMethodRepository();
