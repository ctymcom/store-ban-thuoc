import { DefaultLayout } from '../../../../layouts/default-layout';
import { WaitDeliveryOrder } from './component/wait-delivery-order';

export function WaitDeliveryOrderPage () {
    return  <>
            <DefaultLayout>
                <WaitDeliveryOrder/>
            </DefaultLayout>
    </>;
}