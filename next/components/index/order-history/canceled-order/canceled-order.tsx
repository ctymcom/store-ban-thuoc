import { DefaultLayout } from '../../../../layouts/default-layout';
import { CanceledOrder } from './component/canceled-order';

export function CanceledOrderPage () {
    return  <>
            <DefaultLayout>
                <CanceledOrder/>
            </DefaultLayout>
    </>;
}