import { ProfileUser } from '../../../order-history/component/profile-user';
import { DeliveredOrderDetail } from './delivered-order-detail';

export function DeliveredOrder () {
    return <>
        <div className="container-1 h-auto">
            <div className="grid grid-rows-1">
                <div className="oder-account w-full flex justify-between my-28">
                    <div className="account__user w-1/4">
                        <ProfileUser/>
                    </div>
                    <div className="oder-history w-3/5">
                        <DeliveredOrderDetail/>
                    </div>
                </div> 
            </div>
        </div>
    </>;
}