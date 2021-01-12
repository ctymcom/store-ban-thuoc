import { GraphRepository } from "../graphql/graph-repository";
// import { any } from "../../../src/graphql/modules/address/address.model";
import { gql } from "@apollo/client";
export class AddressRepository extends GraphRepository<any> {
  shortFragment: string = "id province district ward";
  fullFragment: string = "id province district ward";
  apiName: string = "Address";

  async getAllProvince() {
    const api = "getProvince";
    const result = await this.apollo.query({
      query: gql`
        query {
          ${api} {
            id
            province
          }
        }
      `,
    });
    this.handleError(result);
    return result.data[api] as any[];
  }
  async getDistricts(provinceId: string) {
    const api = "getDistrict";
    const result = await this.apollo.query({
      query: gql`
        query {
          ${api}(provinceId: "${provinceId}") {
            id
            district
          }
        }
      `,
    });
    this.handleError(result);
    return result.data[api] as any[];
  }
  async getWards(districtId: string) {
    const api = "getWard";
    const result = await this.apollo.query({
      query: gql`
        query {
          ${api}(districtId: "${districtId}") {
            id
            ward
          }
        }
      `,
    });
    this.handleError(result);
    return result.data[api] as any[];
  }
}
