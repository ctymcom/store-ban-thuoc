import { DefaultLayout } from '../layouts/default-layout';
import { CheckOutPage } from '../components/index/checkout/checkout-page';
import { AddressProvider } from '../components/index/checkout/providers/address-provider';
import { LayoutCart } from '../components/index/cart/components/layout-cart';

export default function CheckOut() {
    return  <LayoutCart name="cart">
                <AddressProvider>
                    <CheckOutPage />
            </AddressProvider>
        </LayoutCart> 
}
CheckOut.Layout = DefaultLayout