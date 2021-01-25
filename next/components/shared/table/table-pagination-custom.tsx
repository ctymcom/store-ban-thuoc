import { times } from "lodash";
import { Pagination } from "../../../lib/graphql/pagination"
import { PaginationFirstPageButton } from "./pagination-firstpage-button";
import { PaginationLastPageButton } from "./pagination-lastpage-button";
import { PaginationNextButton } from "./pagination-next-button";
import { PaginationPrevButton } from "./pagination-prev-button";

export type TablePaginationProps = {
    pagination: Pagination;
    onPageChanged: (page: number) => void;
    numOfPage?: number;
}
export function TablePaginationCustom({ pagination, onPageChanged, numOfPage = 5 }: TablePaginationProps) {
    const form = (pagination.limit * (pagination.page - 1)) + 1; // 1
    let to = form + pagination.limit - 1; // 5 
    to = to > pagination.total ? pagination.total : to;
    const pageCount = Math.ceil(pagination.total / pagination.limit);
    const activeClass = "text-white duration-150 bg-primary-500 border-none";
    const showPageCount = pageCount < numOfPage ? pageCount : numOfPage;
    let pageStartIndex = pagination.page - (showPageCount - 1) > 0 ? pagination.page - showPageCount : 0;
    pageStartIndex = (pageStartIndex + showPageCount) == pageCount && pageStartIndex > 0 && pagination.page < pageCount ? pageStartIndex - 1 : pageStartIndex;
    return <div
        className="flex justify-center px-5 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
    >
        <span className="flex mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
                <ul className="inline-flex items-center space-x-3">
                    {pagination.page > 1 && <PaginationPrevButton onClick={() => onPageChanged(pagination.page - 1)} />}
                    {times(showPageCount, _ => pageStartIndex + _).map((index) => <li key={'page' + index}>
                        <button
                            onClick={() => (index != pagination.page - 1) && onPageChanged(index + 1)}
                            className={(index == pagination.page - 1 && activeClass) + " w-10 h-10 rounded-full border-2 text-lg focus:outline-none focus:shadow-outline-primary"}
                        >{index + 1}</button>
                    </li>)}
                    {(pagination.page < pageCount) && <PaginationNextButton onClick={() => onPageChanged(pagination.page + 1)} />}
                </ul>
            </nav>
        </span>
    </div>
}