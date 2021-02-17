import { CartPayHeader } from '../cart/component/cart-pay-header';
import { ContentStatus } from './component/content-status';
import { statusSuccessed, statusFailed } from './component/completed-data';
export function CompletedPage(props) {
    const status = statusSuccessed;
    return <div className="main-container lg:w-3/4 mx-auto pb-0">
        <CartPayHeader title="comp" />
        <div className="md:flex mt-10">
            <div className="px-20 md:px-0 md:w-1/2">
                <img src={status.img} alt="" />
            </div>
            <div className="md:w-1/2">
                <ContentStatus status={status} />
            </div>
        </div>
    </div>
}