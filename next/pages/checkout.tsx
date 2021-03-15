import { DefaultLayout } from "../layouts/default-layout";
import { CheckOutPage } from "../components/index/checkout/checkout-page";
import { LayoutCart } from "../components/index/cart/components/layout-cart";
import { CheckoutProvider } from "../components/index/checkout/providers/checkout-provider";
import { NextSeo } from "next-seo";

export default function CheckOut() {
  return (
    <>
      <NextSeo title="Trang thanh toán" />
      <LayoutCart name="cart">
        <CheckoutProvider>
          <CheckOutPage />
        </CheckoutProvider>
      </LayoutCart>
    </>
  );
}
CheckOut.Layout = DefaultLayout;
