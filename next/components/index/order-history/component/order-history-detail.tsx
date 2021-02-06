import { PaginationPages } from "../../pagination-pages/pagination-pages";
import { OrderHisttoryList } from "./order-history-list";
import { OrderHistoryData } from "../data/order-history-data";
import { useEffect, useState } from "react";
import { Pagination } from "../../../../lib/graphql/pagination";
import { drop, take } from "lodash";
import Link from 'next/link';

export function OrderHistoryDetail() {
    const [Data, setData] = useState([]);
    const [Pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: OrderHistoryData.length,
        offset: 0
    })
    useEffect(() => {
        const data = take(drop(OrderHistoryData, (Pagination.page - 1) * Pagination.limit), Pagination.limit);
        setData(data) ;
    }, [Pagination])
    const onPageChanged = (page) => {        
        setPagination({ ...Pagination, page}); 
        window.scroll({
            top: 200,
            behavior: 'smooth'
        });
    };
    return <>
        <ul className="order-history__list flex justify-between  border-b-4 pb-1">
            <li className="order-history__item">
                <Link href="/order-history">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 border-b-4 pb-1.5 text-primary border-primary">Tất cả</a>
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
            <OrderHisttoryList data={Data}/>
        </div>
        
        <ul className="pavigation-pages flex">
            <PaginationPages pagination={Pagination} onPageChanged={(page) => onPageChanged(page)}/>
        </ul>
    </>;
}