import { times } from "lodash";
import { Pagination } from "../../../lib/graphql/pagination"
import { PaginationNextButton } from "./pagination-next-button";
import { PaginationPrevButton } from "./pagination-prev-button";

export type TablePaginationProps = {
  pagination: Pagination;
  onPageChanged: (page: number) => void;
  numOfPage?: number;
}
export function TablePagination({ pagination, onPageChanged, numOfPage = 5 }: TablePaginationProps) {
  const form = (pagination.limit * (pagination.page - 1)) + 1;
  let to = form + pagination.limit - 1;
  to = to > pagination.total ? pagination.total : to;
  const pageCount = Math.ceil(pagination.total / pagination.limit);
  const activeClass = "text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600";
  const showPageCount = pageCount < numOfPage ? pageCount : numOfPage;
  let pageStartIndex = pagination.page - (showPageCount - 1) > 0 ? pagination.page - showPageCount : 0;
  pageStartIndex = (pageStartIndex + showPageCount) == pageCount && pageStartIndex > 0 && pagination.page < pageCount ? pageStartIndex - 1 : pageStartIndex;
  return <div
    className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
  >
    <span className="flex items-center col-span-3">
      Showing {form} - {to} of {pagination.total}
    </span>
    <span className="col-span-2"></span>
    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
      <nav aria-label="Table navigation">
        <ul className="inline-flex items-center">
          {pagination.page > 1 && pageCount > numOfPage && <PaginationPrevButton onClick={() => onPageChanged(pagination.page - 1)} />}
          {times(showPageCount, _ => pageStartIndex + _).map((index) => <li key={'page' + index}>
            <button
              onClick={() => (index != pagination.page - 1) && onPageChanged(index + 1)}
              className={(index == pagination.page - 1 && activeClass) + " px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"}
            >{index + 1}</button>
          </li>)}
          {pagination.page <= pageCount - 1 && pageCount > numOfPage && <PaginationNextButton onClick={() => onPageChanged(pagination.page + 1)} />}
        </ul>
      </nav>
    </span>
  </div>
}