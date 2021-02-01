import { DeliveredOrderList } from './delivered-order-list';
import { DeliveredOrderData } from "../data/delivered-order-data";
import { useEffect, useState } from 'react';
import { drop, take } from 'lodash';
import Link from 'next/link';
import { PaginationPages } from '../../../pagination-pages/pagination-pages';
import { Pagination } from './../../../../../lib/graphql/pagination';

export function DeliveredOrderDetail () {
    const [ Data, setData ] = useState([]);
    const [ Pagination, setPagination ] = useState<Pagination>({
        page: 1,
        limit: 10,
        offset: 0,
        total: DeliveredOrderData.length
    });
    useEffect(() => {
        const data = take(drop(DeliveredOrderData, (Pagination.page - 1) * Pagination.limit), Pagination.limit);
        setData(data);
    }, [Pagination]);

    const onPageChanged = (page) => {
        let orderHistoryListElement = document.querySelector('.order-history__list');
        setPagination({ ...Pagination, page: page});
        window.scroll({
            top: 200,
            left: 0,
            behavior: 'smooth'
        })
    }
    return <>
        <ul className="order-history__list flex justify-between  border-b-4 pb-1">
            <li className="order-history__item">
                <Link href="/profile/order-history/">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Tất cả</a>
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
                    <a className="order-history__link uppercase font-semibold text-sm px-3 border-b-4 pb-1.5 text-primary border-primary">Đã giao</a>
                </Link>
            </li>
            <li className="order-history__item">
                <Link href="/profile/order-history/canceled-order">
                    <a className="order-history__link uppercase font-semibold text-sm px-3 hover:text-primary">Đã hủy</a>
                </Link>
            </li>
        </ul>
        <div className="order-history__info-list">
            <DeliveredOrderList data={Data}/>
        </div>
        <ul className="pagination-pages flex">
            <PaginationPages pagination={Pagination} onPageChanged={(page) => onPageChanged(page)}/>
        </ul>
    </>;
}