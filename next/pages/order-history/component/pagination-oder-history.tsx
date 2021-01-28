import { useState } from 'react';
import { isNumber, times } from "lodash";
import { PaginationNextButton } from "../../../../next/components/shared/table/pagination-next-button";
import { PaginationPrevButton } from "../../../../next/components/shared/table/pagination-prev-button";
import { Pagination } from '../../../lib/graphql/pagination';

type PaginationOrderHistory = {
    [x: string]: any,
    pagination: Pagination,
    onPageChanged?: (page: number) => void;
    numOfPage?: number;
}

export function PaginationOderHistory({ pagination, onPageChanged = () => {}, numOfPage = 5 }: PaginationOrderHistory) {

    let from = (pagination.limit * (pagination.page - 1) + 1);
    let to = from + pagination.limit - 1;
    to = to > pagination.total ? pagination.total : to;
    const pageCount = Math.ceil(pagination.total / pagination.limit);
    const activeClass = "text-white transition-colors duration-150 bg-btn-success border-success";
    const showPageCount = pageCount < numOfPage ? pageCount : numOfPage;
    let pageStartIndex = pagination.page - (showPageCount - 1) > 0 ? pagination.page - showPageCount : 0;
    pageStartIndex = (pageStartIndex + showPageCount) == pageCount && pageStartIndex > 0 && pagination.page < pageCount ? pageStartIndex -1 : pageStartIndex;

    return <>
        <div className="pagination__page flex mt-4">
            <span className="flex items-center col-span-3 mr-8">
                Showing {from} - {to} of {pagination.total}
            </span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                    <ul className="inline-flex items-center">
                    {pagination.page > 1 && pageCount > numOfPage && <PaginationPrevButton onClick={() => onPageChanged(pagination.page - 1)} />}
                    {times(showPageCount, _ => pageStartIndex + _).map((index) => 
                        <li key={'page' + index} className="mr-3">
                            <button
                            onClick={() => (index != pagination.page - 1) && onPageChanged(index + 1)}
                            className={(index == pagination.page - 1 && activeClass) + " px-4 py-2 rounded-full focus:outline-none focus:shadow-outline-purple hover:bg-btn-success hover:text-white"}
                            >{index + 1}</button>
                        </li>)}
                    {pagination.page <= pageCount - 1 && pageCount > numOfPage && <PaginationNextButton onClick={() => onPageChanged(pagination.page + 1)} />}
                    </ul>
                </nav>
            </span>
        </div>
        
    </>;
}