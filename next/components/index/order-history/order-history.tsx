import { OrderHistoryDetail } from './component/order-history-detail';

export function OrderHistoryPage() {
    return <>
        <div className="min-h-full w-9/12 ml-6">
            <div className="grid grid-rows-1">
                <div className="w-full flex justify-between mb-16 gap-7">
                    <div className="w-full">
                        <OrderHistoryDetail/>
                    </div>
                </div>
            </div>
        </div>
    </>   
}