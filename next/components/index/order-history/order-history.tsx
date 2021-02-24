import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { OrderHisttoryList } from "./component/order-history-list";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { drop, take } from "lodash";
import { OrderHistoryData } from "./data/order-history-data";
import { Pagination } from "../../../lib/repo/crud.repo";

export function OrderHistoryPage() {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: 10,
        total: OrderHistoryData.length,
        offset: 0
    })
    useEffect(() => {
        setData(OrderHistoryData)
    }, []);
    const onPageChanged = (page) => {        
        setPagination({ ...pagination, page}); 
        window.scroll({
            top: 200,
            behavior: 'smooth'
        });
    };

    const router = useRouter();
    const { status } = router.query;
    const menus = [
        { label: 'Tất cả', status: undefined},
        { label: 'Chờ xác nhận', status: 'pending'},
        { label: 'Đang giao', status: 'delivering'},
        { label: 'Đã giao',status: 'complete'},
        { label: 'Đã hủy', status: 'canceled'},
    ];
   
    return <>
        <div className="min-h-full w-9/12 ml-6">
            <div className="grid grid-rows-1">
                <div className="w-full flex justify-between mb-16 gap-7">
                    <div className="w-full">
                        <ul className="flex justify-between  border-b-4 pb-1.5">
                            { menus.map((menu, index) => (
                                <li key={index}>
                                    <Link href= {
                                            { pathname: '/profile/order-history', query: menu.status ? { status: menu.status} : {} }
                                        }>
                                        <a  className={`uppercase font-semibold text-sm px-3 border-b-4 pb-2.5 rounded-sm hover:text-primary
                                            ${status == menu.status ? 'text-primary border-primary' : ''}`}
                                            >
                                            {menu.label} 
                                        </a>
                                    </Link>
                                </li> 
                            ))}
                        </ul>
                        <div className="">
                            <OrderHisttoryList data={data} status={status}/>
                        </div>
                        
                        <ul className="pavigation-pages flex mt-4 justify-between w-full">
                            <PaginationRound
                                limit={8}
                                page={1}
                                total={143}
                                onPageChange={(page) => {}}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>   
}