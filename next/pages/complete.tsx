import { DefaultLayout } from "../layouts/default-layout";
import { CompletedPage } from "../components/index/completed/completed-page";
import { LayoutCart } from "../components/index/cart/components/layout-cart";

export default function Completed() {
  return (
    <LayoutCart name="complete">
      <CompletedPage />
    </LayoutCart>
  );
}
Completed.Layout = DefaultLayout;
