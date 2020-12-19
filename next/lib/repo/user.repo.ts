import { GraphRepository } from "../graphql/graph-repository";
import { IUser } from "../../../src/graphql/modules/user/user.model";
import { gql } from "@apollo/client";
import { QueryOptions } from "@apollo/client/core";

export class UserRepository extends GraphRepository<IUser> {
  shortFragment: string = "id";
  fullFragment: string = "id";
  apiName: string = "FormData";

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
      user: IUser;
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
