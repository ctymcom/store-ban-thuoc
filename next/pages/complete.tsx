import { DefaultLayout } from "../layouts/default-layout";
import { CompletedPage } from "../components/index/completed/completed-page";
import { LayoutCart } from "../components/index/cart/components/layout-cart";
import { NextSeo } from "next-seo";

export default function Completed() {
  return (
    <>
      <NextSeo title="Trang hoàn thành" />
      <LayoutCart name="complete">
        <CompletedPage />
      </LayoutCart>
    </>
  );
}
Completed.Layout = DefaultLayout;
