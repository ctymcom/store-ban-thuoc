import { QueryOptions } from "@apollo/client/core";
import gql from "graphql-tag";
import { BaseModel, CrudRepository } from "./crud.repo";

export interface User extends BaseModel {
  uid: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  avatar: string;
  province: string;
  district: string;
  ward: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  role: string;
}

export class UserRepository extends CrudRepository<User> {
  apiName = "User";
  shortFragment = this.parseFragment(`
    id: String
    email: String
    name: String
    phone: String
    avatar: String
    role: String
    createdAt: DateTime
    updatedAt: DateTime
  `);
  fullFragment = this.parseFragment(`
    id: String
    uid: String
    email: String
    name: String
    phone: String
    address: String
    avatar: String
    province: String
    district: String
    ward: String
    provinceId: String
    districtId: String
    wardId: String
    role: String
    createdAt: DateTime
    updatedAt: DateTime
  `);

  async login(idToken: string) {
    const api = "login";
    const result = await this.apollo.mutate({
      mutation: gql`
        mutation {
          ${api}(idToken: "${idToken}") {
            user { id name }
            token
          }
        }
      `,
    });
    this.handleError(result);
    return result.data[api] as {
      user: any;
      token: string;
    };
  }

  async userGetMe(token?: string) {
    const api = "userGetMe";
    const option: QueryOptions = {
      query: gql`query {  ${api} { ${this.fullFragment} }}`,
    };
    if (token) option.context = { headers: { "x-token": token } };
    return await this.apollo.query(option);
  }
}

export const UserService = new UserRepository();
