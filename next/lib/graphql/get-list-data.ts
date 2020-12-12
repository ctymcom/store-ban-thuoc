import { Pagination } from './pagination';

export class GetListData<T> {
  data: T[];
  pagination: Pagination;

  constructor({ data, pagination }: GetListData<T>) {
    this.data = data;
    this.pagination = pagination;
  }
}
