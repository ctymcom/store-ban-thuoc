
import { useEffect, useState } from 'react';
import { OrderHistoryItem } from './order-history-item';
import Link from 'next/link';
interface PropsType extends ReactProps {
    data: any[];
    status: any;
}

export function OrderHisttoryList({ data, status }: PropsType) {

    const [listOrder, setListOrder] = useState([]);
    useEffect(() => {
        
    console.log(data, status);
        if(status) {
        setListOrder(data.filter(x => x.status == status))
        } else {
        setListOrder(data)
        }
    }, [status, data]);

    return <>
            {
                listOrder.map((item, index) => {
                    return  (   
                        <OrderHistoryItem item={item} index={index}/>
                    );
                })
            } 
        
    </>;
}