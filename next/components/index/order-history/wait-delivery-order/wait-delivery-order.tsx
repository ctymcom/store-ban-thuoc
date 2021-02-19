import { OrderDeliveryList } from './component/order-delivery-list';

export function WaitDeliveryOrderPage () {
    return  <>
            <div className="h-auto w-9/12 ml-6">
                <div className="grid grid-rows-1">
                    <div className="w-full flex justify-between mb-16 gap-7">
                        <div className="w-full">
                            <OrderDeliveryList/>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}