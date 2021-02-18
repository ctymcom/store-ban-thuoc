import { DeliveredOrderDetail } from './component/delivered-order-detail';

export function DeliveredOrderPage () {
    return  <>
            <div className="h-auto w-9/12 ml-6">
                <div className="grid grid-rows-1">
                    <div className="w-full flex justify-between mb-16 gap-7">
                        <div className="w-full">
                            <DeliveredOrderDetail/>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}