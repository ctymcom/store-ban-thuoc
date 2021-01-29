import { ProfileUser } from '../../../order-history/component/profile-user';
import { OrderDeliveryList } from './order-delivery-list';

export function WaitDeliveryOrder () {
    return <>
        <div className="container-1 h-auto">
            <div className="grid grid-rows-1">
                <div className="oder-account w-full flex justify-between my-28">
                    <div className="account__user w-1/5">
                        <ProfileUser/>
                    </div>
                    <div className="oder-history w-3/4">
                        <OrderDeliveryList/>
                    </div>
                </div> 
            </div>
        </div>
    </>;
}