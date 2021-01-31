import { ProductDetail } from "./component/product-detail";
import { DashboardLayout } from "../../../layouts/dashboard-layout";

export function ProductDetailPage() {
  return (
    <>
      <DashboardLayout>
        <ProductDetail />
      </DashboardLayout>
    </>
  );
}
