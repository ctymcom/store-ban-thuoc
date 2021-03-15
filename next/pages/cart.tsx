import CartPage from "../components/index/cart/cart-page";
import { DefaultLayout } from "../layouts/default-layout";
import { LayoutCart } from "../components/index/cart/components/layout-cart";
import { NextSeo } from "next-seo";

export default function Cart() {
  return (
    <>
      <NextSeo title="Trang giỏ hàng" />
      <LayoutCart name="cart">
        <CartPage />
      </LayoutCart>
    </>
  );
}
Cart.Layout = DefaultLayout;
