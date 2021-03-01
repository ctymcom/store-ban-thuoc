import { DefaultLayout } from '../layouts/default-layout';
import { CheckOutPage } from '../components/index/checkout/checkout-page';
import { AddressProvider } from '../components/index/checkout/providers/address-provider';

export default function CheckOut() {
    return <AddressProvider>
        <CheckOutPage />
    </AddressProvider>
}
CheckOut.Layout = DefaultLayout