import { DefaultLayout } from '../layouts/default-layout';
import { CheckOutPage } from '../components/index/checkout/checkout-page';

export default function CheckOut() {
    return <>
        <CheckOutPage />
    </>
}
CheckOut.Layout = DefaultLayout