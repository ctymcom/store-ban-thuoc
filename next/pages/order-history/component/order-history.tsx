import { OrderHistoryDetail } from "./order-history-detail";
import { ProfileUser } from "./profile-user";

export function OrderHistory () {
    return  <>
        <div className="container-1 min-h-full">
            <div className="grid grid-rows-1">
                <div className="oder-account w-full flex justify-between my-28">
                    <div className="account__user w-1/4">
                        <ProfileUser/>
                    </div>
                    <div className="oder-history w-3/5">
                        <OrderHistoryDetail/>
                    </div>
                </div>  
            </div>
        </div>
    </>;
}