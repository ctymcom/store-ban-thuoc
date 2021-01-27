import { CartPayHeader } from '../../../layouts/components/cart-pay-header';
import { ContentStatus } from './content-status';
import { statusSuccessed, statusFailed } from './completed-data';
export function Completed(props) {
    const { title } = props;
    const status = statusSuccessed;
    return <div className="w-3/4 mx-auto pb-0">
        <CartPayHeader title={title} />
        <div className="flex mt-10">
            <div className="w-1/2">
                <img src={status.img} alt="" />
            </div>
            <div className="w-1/2">
                <ContentStatus status={status} />
            </div>
        </div>
    </div>
}