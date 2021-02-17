import { CartPayHeader } from '../cart/component/cart-pay-header';
import { ContentStatus } from './component/content-status';
import { statusSuccessed, statusFailed } from './component/completed-data';
export function CompletedPage(props) {
    const status = statusSuccessed;
    return <div className="md:w-3/4 mx-auto pb-0">
        <CartPayHeader/>
        <div className="md:flex mt-10">
            <div className="w-1/2 mx-auto">
                <img src={status.img} alt="" />
            </div>
            <div className="md:w-1/2">
                <ContentStatus status={status} />
            </div>
        </div>
    </div>
}