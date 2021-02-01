import { DefaultLayout } from '../../../../layouts/default-layout';
import { WaitConfirmOrder } from './component/wait-confirm-order';

export function WaitConfirmOrderPage () {
    return  <>
            <DefaultLayout>
                <WaitConfirmOrder/>
            </DefaultLayout>
    </>;
}