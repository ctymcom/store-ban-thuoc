import { times } from "lodash";
import { Pagination } from '../../../../lib/graphql/pagination';
import { PaginationPrevBtnCustom } from '../../pagination-pages/pagination-prev-btn-custom';
import { PaginationNextBtnCusTom } from '../../pagination-pages/pagination-next-btn-custom';
import { PaginationFirstPageBtnCustom } from '../../pagination-pages/pagination-firstpage-btn-custom';
import { PaginationLastPageBtnCustom } from "../../pagination-pages/pagination-lastpage-btn-custom";

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
    pageStartIndex = (pageStartIndex + showPageCount) == pageCount && pageStartIndex > 0 && pagination.page < pageCount ? pageStartIndex - 1 : pageStartIndex;
    let haflPage = Math.ceil(numOfPage / 2);
    let pageEndIndex = (pagination.page <= haflPage) ? 0 : (pagination.page == haflPage + 1 ? 1 : ((pagination.page >= pageCount) ? 0 : (pagination.page + haflPage - 1 > pageCount ? 1 : Math.floor(numOfPage / 2))))

    return <>
        <div className="pagination__page flex mt-4 justify-between w-full">
            <span className="flex items-center col-span-3 mr-8">
                Hiển thị {from} - {to} của {pagination.total} sẩn phẩm
            </span>
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                <nav aria-label="Table navigation">
                    <ul className="inline-flex items-center">
                        {pagination.page > 1 && pageCount > numOfPage && <PaginationFirstPageBtnCustom onClick={() => onPageChanged(pagination.page = 1)} />}
                        {pagination.page > 1 && pageCount > numOfPage && <PaginationPrevBtnCustom onClick={() => onPageChanged(pagination.page - 1)} />}
                        {times(showPageCount, _ => pageStartIndex + _ + pageEndIndex).map((index) =>
                            <li key={'page' + (index)} className="mx-1.5">
                                <button
                                    onClick={() => (index != pagination.page - 1) && onPageChanged(index + 1)}
                                    className={" px-2.5 py-0.5 border-2 border-gray-600 hover:border-success " +
                                        (index == pagination.page - 1 && activeClass) + " rounded-full focus:outline-none focus:shadow-outline-purple hover:text-success "}>
                                    <span className="text-xl ">{index + 1}</span>

                                </button>
                            </li>
                        )}
                        {pagination.page <= pageCount - 1 && pageCount > numOfPage && <PaginationNextBtnCusTom onClick={() => onPageChanged(pagination.page + 1)} />}
                        {pagination.page <= pageCount - 1 && pageCount > numOfPage && <PaginationLastPageBtnCustom onClick={() => onPageChanged(pagination.page = pageCount)} />}
                    </ul>
                </nav>
            </span>
        </div>
    </>;
}