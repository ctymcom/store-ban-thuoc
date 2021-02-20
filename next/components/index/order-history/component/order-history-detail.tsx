import { OrderHisttoryList } from "./order-history-list";
import { OrderHistoryData } from "../data/order-history-data";
import { useEffect, useState } from "react";
import { drop, take } from "lodash";
import Link from 'next/link';
import { PaginationRound } from "../../../shared/utilities/pagination/pagination-round";
import { Pagination } from "../../../../lib/graphql/pagination";
// import { Pagination } from "../../../../lib/graphql/pagination";

export function OrderHistoryDetail() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: OrderHistoryData.length,
        offset: 0
    })
    useEffect(() => {
        const data = take(drop(OrderHistoryData, (pagination.page - 1) * pagination.limit), pagination.limit);
        setData(data) ;
    }, [pagination])
    const onPageChanged = (page) => {        
        setPagination({ ...pagination, page}); 
        window.scroll({
            top: 200,
            behavior: 'smooth'
        });
    };
    return <>
        <ul className="order-history__list flex justify-between  border-b-4 pb-1.5">
            <li className="order-history__item">
                <Link href="/order-history">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 border-b-4 pb-2.5 rounded-sm text-primary border-primary">Tất cả</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/wait-confirm-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Chờ xác nhận</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/wait-delivery-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Đang giao</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/delivered-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Đã giao</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/canceled-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Đã hủy</a>
                </Link>
            </li>
        </ul>
        <div className="order-history__info-list">
            <OrderHisttoryList data={data}/>
        </div>
        
        <ul className="pavigation-pages flex mt-4 justify-between w-full">
            <PaginationRound
                limit={8}
                page={1}
                total={143}
                onPageChange={(page) => {}}
            />
        </ul>
    </>;
}