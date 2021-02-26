import { PaginationRound } from "../../shared/utilities/pagination/pagination-round";
import { OrderHisttoryList } from "./component/order-history-list";
import Link from 'next/link';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OrderHistoryData } from "./data/order-history-data";

export function OrderHistoryPage() {
    const [data, setData] = useState([]);
    // const [pagination, setPagination] = useState<Pagination>({
    //     page: 1,
    //     limit: 10,
    //     total: OrderHistoryData.length,
    //     offset: 0
    // })
    // const onPageChanged = (page) => {        
    //     setPagination({ ...pagination, page}); 
    //     window.scroll({
    //         top: 200,
    //         behavior: 'smooth'
    //     });
    // };
    const router = useRouter();
    const { status } = router.query;

    const handlerOrder = (value) => {
        router.push({
            pathname: '/profile/order-history',
            query: value ? { status: value } : ''
        });
        console.log(value);
        
    }; 
        
    useEffect(() => {
        setData(OrderHistoryData);
        // console.log(filterOrder);
        // console.log(typeof filterOrder);
        
        // switch(filterOrder.toString()) {
        //     case '1': setData(OrderHistoryData.filter(x => x.status == 'pending'));
        //     case '2': setData(OrderHistoryData.filter(x => x.status == 'delivering'));
        //     case '3': setData(OrderHistoryData.filter(x => x.status == 'complete'));
        //     case '4': setData(OrderHistoryData.filter(x => x.status == 'canceled'));
        //     default: setData(OrderHistoryData);
        // }
    }, []);

    const menus = [
        { label: 'Tất cả đơn hàng', status: ''},
        { label: 'Chờ xác nhận', status: 'pending'},
        { label: 'Đang giao', status: 'delivering'},
        { label: 'Đã giao',status: 'complete'},
        { label: 'Đã hủy', status: 'canceled'},
    ];
    // console.log(status);
    
    return <>
    
        <div className="w-full lg:w-9/12 px-3 md:px-0">
            <div className="">
                <div className="w-full flex justify-between mt-0 md:mt-5 lg:mt-0 mb-0 gap-7">
                    <div className="w-full">
                        <p className="md:hidden whitespace-nowrap text-center mb-3">Lọc theo đơn hàng:</p>
                        <select className="block md:hidden m-auto border border-gray-400 rounded w-8/12 px-4 py-2 hover:border-primary focus:border-primary-dark focus:outline-none"
                                value={status}
                                onChange={(e) => handlerOrder(e.target.value)}>
                                    {
                                        menus.map(type => <option key={type.status} value={(type.status) ? type.status : ''}>{ type.status == '' ? 'Tất cả đơn hàng' : type.label }</option>)
                                    }      
                        </select>
                        <ul className="hidden md:flex justify-between border-b-4 pb-2 mt-3 md:mt-0 h-auto">
                            { menus.map((menu, index) => (
                                <>
                                    <li key={index}>
                                        <Link href= {{ pathname: '/profile/order-history', query: menu.status ? { status: menu.status } : {} } }>
                                            <a  className={`normal-case lg:uppercase font-extralight md:font-semibold whitespace-nowrap text-base px-3 border-b-4 pb-2.5 rounded-sm hover:text-primary
                                                ${(status ? status == menu.status : !menu.status) ? ' text-primary border-primary animate-slide-up' : ''}`}
                                                >
                                                {menu.label}
                                            </a>
                                        </Link>
                                    </li> 
                                </>
                            ))}
                        </ul>
                        {/* <ul className="flex justify-between border-b-4 pb-1.5 mt-3 md:mt-0 overflow-x-auto md:overflow-hidden">
                            { list.map((item, index) => (
                                <li className="abcdefg" key={index} onClick={() => handleScrollIntoView(index)}>   
                                    <a  className=' normal-case lg:uppercase font-extralight md:font-semibold whitespace-nowrap text-base px-3 border-b-4 pb-2.5 rounded-sm hover:text-primary'>
                                            {item} 
                                        </a>
                                </li> 
                            ))}
                        </ul> */}
                        <div className="w-full">
                            <OrderHisttoryList data={data} status={status}/>
                        </div>
                        
                        <ul className="pavigation-pages flex mt-4 md:mt-7 justify-between w-full">
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