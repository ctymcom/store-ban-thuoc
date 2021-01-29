import { QueryOptions, MutationOptions, ApolloQueryResult, FetchResult } from "@apollo/client/core";
import gql from "graphql-tag";
import { Pagination } from "./pagination";
import { GetListData } from "./get-list-data";
import { QueryInput } from "./query-input";
import { initializeApollo, useApollo } from "./apolloClient";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
export abstract class GraphRepository<T> {
  abstract shortFragment: string;
  abstract fullFragment: string;
  abstract apiName: string;

  private $apollo: ApolloClient<NormalizedCacheObject>;

  get apollo() {
    if (!this.$apollo) {
      this.$apollo = initializeApollo();
    }
    return this.$apollo;
  }

  async getAll({
    fragment,
    query,
    cache = true,
  }: {
    fragment?: string;
    query?: QueryInput;
    cache?: boolean;
  }) {
    fragment = fragment || this.shortFragment;
    const api = `getAll${this.apiName}`;
    const options = {
      query: gql`
      query GetAll(\$q: QueryGetListInput!) {
        ${api}(q: \$q) { data { ${fragment} } pagination { limit page total } }
      }
      `,
      variables: { q: query || {} },
      fetchPolicy: cache ? "network-only" : "no-cache",
    } as QueryOptions;
    const result = await this.apollo.query<any>(options);
    this.handleError(result);
    return new GetListData<T>({
      data: result.data[api].data as T[],
      pagination: new Pagination(result.data[api].pagination),
    });
  }

  async getOne({ id, fragment, cache = true }: { id: string; fragment?: string; cache?: boolean }) {
    fragment = fragment || this.fullFragment;
    const api = `getOne${this.apiName}`;
    const options = {
      query: gql`
      query GetOne {
        ${api}(id: "${id}") {  ${fragment}  }
      }
      `,
      fetchPolicy: cache ? "network-only" : "no-cache",
    } as QueryOptions;
    const result = await this.apollo.query(options);
    this.handleError(result);
    return result.data[api] as T;
  }
  async create({ data, fragment }: { data: any; fragment?: string }) {
    fragment = fragment || this.fullFragment;
    const api = `create${this.apiName}`;
    const options = {
      mutation: gql`
      mutation Create(\$d: Create${this.apiName}Input!) {
        ${api}(data:  \$d) {  ${fragment}  }
      }
      `,
      fetchPolicy: "no-cache",
      variables: { d: data },
    } as MutationOptions;
    console.log("mutation", options);
    const result = await this.apollo.mutate(options);
    this.handleFetchError(result);
    return result.data[api] as T;
  }

  async update({ id, data, fragment }: { id: string; data: any; fragment?: string }) {
    fragment = fragment || this.fullFragment;
    const api = `update${this.apiName}`;
    const options = {
      mutation: gql`
      mutation Update(\$d: Update${this.apiName}Input!) {
        ${api}(id: "${id}", data:  \$d) {  ${fragment}  }
      }
      `,
      fetchPolicy: "no-cache",
      variables: { d: data },
    } as MutationOptions;
    const result = await this.apollo.mutate(options);
    this.handleFetchError(result);
    return result.data[api] as T;
  }

  async delete({ id, fragment }: { id: string; fragment?: string }) {
    fragment = fragment || this.shortFragment;
    const api = `deleteOne${this.apiName}`;
    const options = {
      mutation: gql`
      mutation Delete {
        ${api}(id: "${id}") { ${fragment}  }
      }
      `,
      fetchPolicy: "no-cache",
    } as MutationOptions;

    const result = await this.apollo.mutate(options);
    this.apollo.cache.removeOptimistic;
    this.handleFetchError(result);
    return result.data[api] as T;
  }

  handleError(result: ApolloQueryResult<any>) {
    if (result.error) {
      throw Error(result.error.message);
    }
    if (result.errors && result.errors.length > 0) {
      throw Error(result.errors[0].message);
    }
  }

  handleFetchError(result: FetchResult) {
    if (result.errors && result.errors.length > 0) {
      throw Error(result.errors[0].message);
    }
  }
}
