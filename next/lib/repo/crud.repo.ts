import { MutationOptions, QueryOptions } from "@apollo/client/core";
import { GraphRepository } from "../graphql/graph.repo";
import { queryParser } from "../helpers/query-parser.helper";

export interface Pagination {
  limit?: number;
  offset?: number;
  page?: number;
  total?: number;
}

export class QueryInput {
  limit?: number;
  page?: number;
  offset?: number;
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

  getAllQuery(
    {
      query = { limit: 10 },
      fragment = this.shortFragment,
    }: {
      query: QueryInput | string;
      fragment?: string;
    } = {
      query: { limit: 10 },
    }
  ): string {
    if ((query as QueryInput).limit == 0) {
      query = { ...(query as QueryInput), limit: 1000 };
    }

    const api = `getAll${this.apiName}`;
    return `${api}(q: ${queryParser(query, {
      hasBraces: true,
    })}) { data { ${fragment} } pagination { limit page total } }`;
  }

  async getAll({
    query = { limit: 10 },
    fragment = this.shortFragment,
    cache = true,
  }: {
    fragment?: string;
    query?: QueryInput;
    cache?: boolean;
  } = {}): Promise<GetListData<T>> {
    const options = {
      query: this.gql`${this.generateGQL(
        "query",
        `${this.getAllQuery({ query: "$q", fragment })}`,
        `($q: QueryGetListInput!)`
      )}`,
      variables: { q: query },
      fetchPolicy: cache ? "network-only" : "no-cache",
    } as QueryOptions;
    const result = await this.apollo.query<any>(options);
    this.handleError(result);
    console.log("getAll" + this.apiName, result.data["g0"].data);
    return {
      data: result.data["g0"].data as T[],
      pagination: result.data["g0"].pagination,
    };
  }

  getOneQuery({ id, fragment = this.fullFragment }: { id: string; fragment?: string }): string {
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
      query: this.gql`${this.generateGQL("query", `${this.getOneQuery({ id, fragment })}`)}`,
      fetchPolicy: cache ? "network-only" : "no-cache",
    } as QueryOptions;
    const result = await this.apollo.query(options);
    this.handleError(result);
    console.log("getOne" + this.apiName, result.data["g0"]);
    return result.data["g0"] as T;
  }

  createQuery({
    data,
    fragment = this.fullFragment,
  }: {
    data: Partial<T> | string;
    fragment?: string;
  }): string {
    const api = `create${this.apiName}`;
    return `${api}(data: ${queryParser(data, { hasBraces: true })}) { ${fragment} }`;
  }

  async create({ data, fragment = this.fullFragment }: { data: Partial<T>; fragment?: string }) {
    const options = {
      mutation: this.gql`${this.generateGQL(
        "mutation",
        `${this.createQuery({ data: "$data", fragment })}`,
        `($data: Create${this.apiName}Input!)`
      )}`,
      fetchPolicy: "no-cache",
      variables: { data },
    } as MutationOptions;
    const result = await this.apollo.mutate(options);
    this.handleError(result);
    return result.data["g0"] as T;
  }

  updateQuery({
    id,
    data,
    fragment = this.fullFragment,
  }: {
    id: string;
    data: Partial<T> | string;
    fragment?: string;
  }): string {
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
      mutation: this.gql`${this.generateGQL(
        "mutation",
        `${this.updateQuery({ id, data: "$data", fragment })}`,
        `($data: Update${this.apiName}Input!)`
      )}`,
      variables: { data },
      fetchPolicy: "no-cache",
    } as MutationOptions;
    const result = await this.apollo.mutate(options);
    this.handleError(result);
    return result.data["g0"] as T;
  }

  createOrUpdate({
    id,
    data,
    fragment = this.shortFragment,
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

  deleteQuery({ id, fragment = "id" }: { id: string; fragment?: string }): string {
    const api = `deleteOne${this.apiName}`;
    return `${api}(id: "${id}") { ${fragment} }`;
  }

  async delete({
    id,
    ids,
    fragment = this.shortFragment,
  }: {
    id?: string;
    ids?: string[];
    fragment?: string;
  }) {
    if (id) {
      const options = {
        mutation: this.gql`${this.generateGQL(
          "mutation",
          `${this.deleteQuery({ id, fragment })}`
        )}`,
        fetchPolicy: "no-cache",
      } as MutationOptions;

      const result = await this.apollo.mutate(options);
      this.apollo.cache.removeOptimistic(id);
      this.handleError(result);
      return result.data["g0"] as T;
    } else if (ids && ids.length) {
      const options = {
        mutation: this.gql`${this.generateGQL(
          "mutation",
          ids.map((id) => `${this.deleteQuery({ id, fragment })}`)
        )}`,
        fetchPolicy: "no-cache",
      } as MutationOptions;

      const result = await this.apollo.mutate(options);
      ids.map((id) => this.apollo.cache.removeOptimistic(id));
      this.handleError(result);
      return result.data;
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
