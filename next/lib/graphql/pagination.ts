export class Pagination {
  limit: number;
  offset: number;
  page: number;
  total: number;
  constructor({ limit, offset, page, total }: Pagination) {
    this.limit = limit;
    this.offset = offset;
    this.page = page;
    this.total = total;
  }
}