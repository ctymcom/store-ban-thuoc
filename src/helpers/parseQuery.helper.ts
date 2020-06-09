import { FindOptions, IncludeOptions } from "sequelize/types";
import { configs } from "../configs";
import * as _ from 'lodash';

interface IParseQuery {
  page?: string;
  limit?: string;
  offset?: string;
  join?: string | any;
  order?: string;
  filter?: any;
  search: string;
}

export class ParseQueryHelper {
  static parseGetList(query: any) {
    let options: FindOptions = {};

    let paging = this.parsePagination(query);
    options.limit = paging.limit;
    options.offset = paging.offset;

    options.order = this.parseSort(query);

    // Filter
    options.where = this.parseFilter(query);

    // Join Table
    options.include = this.parseJoin(query);

    console.log(options);

    return options;
  }

  static parseJoin(query: IParseQuery) {
    let join: string[] = [];
    query.join = query.join || [];

    if (this.isString(query.join)) {
      join = JSON.parse(query.join || `[]`);
    } else {
      join = [...query.join];
    }

    let include = [...join];

    return include;
  }

  static parseSort(query: IParseQuery) {
    if (Array.isArray(query.order)) {
      return query.order;
    }

    const order = JSON.parse(query.order || `[["createdAt", "DESC"]]`) || [
      ["createdAt", "DESC"],
    ];
    return order;
  }

  static parseFilter(query: IParseQuery) {
    // const filter = JSON.parse(query.filter || "{}");
    return query.filter;
  }

  static parsePagination(query: IParseQuery) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || configs.query.limit;
    const offset = parseInt(query.offset) || (page - 1) * limit;

    return {
      limit,
      offset,
      page,
    };
  }

  static parseGetOne(query: any) {}

  static isString(x: string) {
    return _.isString(x) && x !== undefined;
  }

}
