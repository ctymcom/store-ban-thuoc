
// import { useEffect, useState } from 'react';
import { OrderHistoryItem } from './order-history-item';
interface PropsType extends ReactProps {
    data: any[];
    status: any;
}

export function OrderHisttoryList({ data, status }: PropsType) {

    // const [list, setList] = useState();
    // useEffect(() => {
        
    // }, [status]);

    return <>
        <OrderHistoryItem data={data} status={status}/>
    </>;
}