export class QueryInput {
  limit?: number;
  page?: number;
  search?: string;
  order?: any;
  filter?: any;
  constructor({ limit = 20, page = 1, search, order, filter }: QueryInput) {
    this.limit = limit;
    this.page = page;
    this.search = search;
    this.order = order;
    this.filter = filter;
  }
}
