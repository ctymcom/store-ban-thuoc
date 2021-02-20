import { MutationOptions, QueryOptions } from "@apollo/client/core";
import gql from "graphql-tag";
import { GraphRepository } from "../graphql/graph.repo";
import { queryParser } from "../helpers/query-parser.helper";

export interface Pagination {
  limit: number;
  offset: number;
  page: number;
  total: number;
}

export class QueryInput {
  limit?: number;
  page?: number;
  search?: string;
  order?: any;
  filter?: any;
}

export interface GetListData<T> {
  data: T[];
  pagination: Pagination;
}

export interface BaseModel {
  id?: string;
  updatedAt?: Date;
  createdAt?: Date;
  [x: string]: any;
}

export abstract class CrudRepository<T extends BaseModel> extends GraphRepository {
  abstract apiName: string;
  abstract shortFragment: string;
  abstract fullFragment: string;

  getAllQuery(query?: QueryInput | string, fragment?: string): string {
    const api = `getAll${this.apiName}`;
    return `${api}(q: ${queryParser(query, {
      hasBraces: true,
    })}) { data { ${fragment} } pagination { limit page total } }`;
  }

  async getAll({
    fragment = this.shortFragment,
    query = { limit: 20, page: 1 },
    cache = true,
  }: {
    fragment?: string;
    query?: QueryInput;
    cache?: boolean;
  }): Promise<GetListData<T>> {
    const options = {
      query: gql`
        query GetAll($q: QueryGetListInput!) {
          g0: ${this.getAllQuery("$q", fragment)}
        }
      `,
      variables: { q: query },
      fetchPolicy: cache ? "network-only" : "no-cache",
    } as QueryOptions;
    const result = await this.apollo.query<any>(options);
    this.handleError(result);
    return {
      data: result.data["g0"].data as T[],
      pagination: result.data["g0"].pagination,
    };
  }

  getOneQuery(id: string, fragment?: string): string {
    const api = `getOne${this.apiName}`;
    return `${api}(id: "${id}") { ${fragment} }`;
  }

  async getOne({
    id,
    fragment = this.fullFragment,
    cache = true,
  }: {
    id: string;
    fragment?: string;
    cache?: boolean;
  }) {
    const options = {
      query: gql`
        query GetOne {
          g0: ${this.getOneQuery(id, fragment)}
        }
      `,
      fetchPolicy: cache ? "network-only" : "no-cache",
    } as QueryOptions;
    const result = await this.apollo.query(options);
    this.handleError(result);
    return result.data["g0"] as T;
  }

  createQuery(data: any, fragment: string = "id"): string {
    const api = `create${this.apiName}`;
    return `${api}(data: ${queryParser(data, { hasBraces: true })}) { ${fragment} }`;
  }

  async create({ data, fragment = this.fullFragment }: { data: Partial<T>; fragment?: string }) {
    const options = {
      mutation: gql`
        mutation Create($data: Create${this.apiName}Input!) {
          g0: ${this.createQuery("$data", fragment)}
        }
      `,
      fetchPolicy: "no-cache",
      variables: { data },
    } as MutationOptions;
    const result = await this.apollo.mutate(options);
    this.handleError(result);
    return result.data["g0"] as T;
  }

  updateQuery(id: string, data: any, fragment: string = "id"): string {
    const api = `update${this.apiName}`;
    return `${api}(id: "${id}", data: ${queryParser(data, { hasBraces: true })}) { ${fragment} }`;
  }

  async update({
    id,
    data,
    fragment = this.fullFragment,
  }: {
    id: string;
    data: Partial<T>;
    fragment?: string;
  }) {
    const options = {
      mutation: gql`
        mutation Update($data: Update${this.apiName}Input!) {
          g0: ${this.updateQuery(id, "$data", fragment)}
        }
      `,
      fetchPolicy: "no-cache",
      variables: { data },
    } as MutationOptions;
    const result = await this.apollo.mutate(options);
    this.handleError(result);
    return result.data["g0"] as T;
  }

  createOrUpdate({
    id,
    data,
    fragment = null,
  }: {
    id?: string;
    data: Partial<T>;
    fragment?: string;
  }) {
    if (id) {
      return this.update({ id, data, fragment });
    } else {
      return this.create({ data, fragment });
    }
  }

  deleteQuery(id: string, fragment: string = "id"): string {
    const api = `deleteOne${this.apiName}`;
    return `${api}(id: "${id}") { ${fragment} }`;
  }

  async delete({
    id,
    ids,
    fragment = this.shortFragment,
  }: {
    id?: string;
    ids?: string;
    fragment?: string;
  }) {
    if (id) {
      const options = {
        mutation: gql`
          mutation Delete {
            g0: ${this.deleteQuery(id, fragment)}
          }
        `,
        fetchPolicy: "no-cache",
      } as MutationOptions;

      const result = await this.apollo.mutate(options);
      this.apollo.cache.removeOptimistic(id);
      this.handleError(result);
      return result.data["g0"] as T;
    } else if (ids && ids.length) {
    } else return;
  }

  parseFragment(fragment) {
    const fragments = [];
    const lines = fragment.trim().split("\n");
    for (const line of lines) {
      const parts = line.split(":");
      const key = parts[0];
      fragments.push(key);
    }
    return fragments.join(" ").trim();
  }
}
