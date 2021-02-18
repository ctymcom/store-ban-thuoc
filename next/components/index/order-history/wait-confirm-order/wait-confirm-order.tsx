import { OrderConfirmList } from './component/order-confirm-list';

export function WaitConfirmOrderPage () {
    return  <>
            <div className="h-auto w-9/12 ml-6">
                <div className="grid grid-rows-1">  
                    <div className="w-full flex justify-between mb-16 gap-7">
                        <div className="w-full">
                            <OrderConfirmList/>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}