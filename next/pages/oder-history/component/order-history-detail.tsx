import { PaginationOderHistory } from "./pagination-oder-history";
import { OrderHisttoryList } from "./order-history-list";
import { OrderHistoryData } from "../data/order-history-data";
import { useEffect, useState } from "react";
import { Pagination } from "../../../lib/graphql/pagination";
import { drop, take } from "lodash";

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
        console.log('onPageChanged', Pagination, page);
        setPagination({ ...Pagination, page}); 
    };
    return <div>
        <ul className="oder-history__list flex justify-between  border-b-4 pb-1">
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 border-b-4 pb-1.5 text-success border-success">Tất cả</a>
            </li>
            <li className="oder-history__item hover:border-success">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Chờ xác nhận</a>
            </li>
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đang giao</a>
            </li>
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đã giao</a>
            </li>
            <li className="oder-history__item">
                <a href="#" className="oder-history__link uppercase font-semibold text-sm px-3 hover:text-success">Đã hủy</a>
            </li>
        </ul>
        <div className="oder-history__info-list">
            <OrderHisttoryList data={Data}/>
        </div>
        
        <ul className="navigation-pages flex">
            <PaginationOderHistory pagination={Pagination} onPageChanged={(page) => onPageChanged(page)}/>
        </ul>
    </div>;
}