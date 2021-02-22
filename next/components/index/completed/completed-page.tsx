import { CartPayHeader } from '../cart/component/cart-pay-header';
import { ContentStatus } from './component/content-status';
import { statusSuccessed } from './component/completed-data';
export function CompletedPage() {
    const status = statusSuccessed;
    return <div className="main-container pb-0">
        <CartPayHeader name="complete"/>
        <div className="md:flex md:w-3/4 mx-auto mt-10">
            <div className="w-1/3 lg:w-1/2 mx-auto">
                <img src={status.img} alt="" />
            </div>
            <div className="md:w-1/2">
                <ContentStatus status={status} />
            </div>
        </div>
    </div>
}