import { DeliveredOrderList } from './delivered-order-list';
import { DeliveredOrderData } from "../data/delivered-order-data";
import { useEffect, useState } from 'react';
import { drop, take } from 'lodash';
import Link from 'next/link';
// import { Pagination } from './../../../../../lib/graphql/pagination';
import { PaginationRound } from '../../../../shared/utilities/pagination/pagination-round';
import { Pagination } from '../../../../../lib/repo/crud.repo';

export function DeliveredOrderDetail () {
    const [ Data, setData ] = useState([]);
    const [ pagination, setPagination ] = useState<Pagination>({
        page: 1,
        limit: 10,
        offset: 0,
        total: DeliveredOrderData.length
    });
    useEffect(() => {
        const data = take(drop(DeliveredOrderData, (pagination.page - 1) * pagination.limit), pagination.limit);
        setData(data);
    }, [pagination]);

    const onPageChanged = (page) => {
        setPagination({ ...pagination, page: page});
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
        <ul className="pagination-pages flex mt-4 justify-between w-full">
            {/* <PaginationPages pagination={Pagination} onPageChanged={(page) => onPageChanged(page)}/> */}
            <PaginationRound
                limit={8}
                page={1}
                total={143}
                onPageChange={(page) => {}}
            />
        </ul>
    </>;
}