import { GraphRepository } from "../graphql/graph.repo";
// import { any } from "../../../src/graphql/modules/user/user.model";

import { QueryOptions } from "@apollo/client/core";
import gql from "graphql-tag";
import { CrudRepository } from "./crud.repo";

export class UserRepository extends CrudRepository<any> {
  shortFragment: string = "id";
  fullFragment: string = "id";
  apiName: string = "User";

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
