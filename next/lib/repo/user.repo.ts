import { GraphRepository } from "../graphql/graph-repository";
// import { any } from "../../../src/graphql/modules/user/user.model";
import { gql } from "@apollo/client";
import { QueryOptions } from "@apollo/client/core";

export class UserRepository extends GraphRepository<any> {
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
    this.handleFetchError(result);
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
