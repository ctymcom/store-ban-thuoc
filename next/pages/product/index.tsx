import { useRouter } from "next/router";
import { AdminLayout } from "../../layouts/admin-layout";

export default function Page(props) {
  const router = useRouter();
  router.replace("/products");
}

Page.Layout = AdminLayout