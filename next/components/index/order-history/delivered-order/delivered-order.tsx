import { DefaultLayout } from "../../../../layouts/default-layout";
import { DeliveredOrder } from './component/delivered-order';

export function DeliveredOrderPage () {
    return  <>
            <DefaultLayout>
                <DeliveredOrder/>
            </DefaultLayout>
    </>;
}