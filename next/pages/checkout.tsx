import { DefaultLayout } from '../layouts/default-layout';
import { CheckOutPage } from '../components/index/checkout/checkout-page';
import { LayoutCart } from '../components/index/cart/components/layout-cart';
import { CheckoutProvider } from '../components/index/checkout/providers/checkout-provider';

export default function CheckOut() {
    return  <LayoutCart name="cart">
                <CheckoutProvider>
                    <CheckOutPage />
            </CheckoutProvider>
        </LayoutCart> 
}
CheckOut.Layout = DefaultLayout