import { PaginationOderHistory } from "./pagination-oder-history";
import { OrderHisttoryList } from "./order-history-list";
import { OrderHistoryData } from "../data/order-history-data";
import { useEffect, useState } from "react";
import { Pagination } from "../../../lib/graphql/pagination";
import { drop, take } from "lodash";
import Link from 'next/link';

export function OrderHistoryDetail() {
    const [Data, setData] = useState([]);
    const [Pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 5,
        total: OrderHistoryData.length,
        offset: 0
    })
    useEffect(() => {
        const data = take(drop(OrderHistoryData, (Pagination.page - 1) * Pagination.limit), Pagination.limit);
        setData(data) ;
    }, [Pagination])
    const onPageChanged = (page) => { 
        let orderHistoryListElement = document.querySelector('ul.order-history__list.flex.justify-between') as HTMLElement;        
        setPagination({ ...Pagination, page}); 
        window.scroll({
            top: orderHistoryListElement.offsetHeight,
            behavior: 'smooth'
        });
    };
    return <>
        <ul className="order-history__list flex justify-between  border-b-4 pb-1">
            <li className="order-history__item">
                <Link href="/order-history">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 border-b-4 pb-1.5 text-success border-success">Tất cả</a>
                </Link>
                
            </li>
            <li className="order-history__item hover:border-success">
                <Link href="/profile/order-history/wait-confirm-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-success">Chờ xác nhận</a>
                </Link>
                
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/wait-delivery-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đang giao</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/delivered-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đã giao</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/canceled-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đã hủy</a>
                </Link>
            </li>
        </ul>
        <div className="order-history__info-list">
            <OrderHisttoryList data={Data}/>
        </div>
        
        <ul className="navigation-pages flex">
            <PaginationOderHistory pagination={Pagination} onPageChanged={(page) => onPageChanged(page)}/>
        </ul>
    </>;
}