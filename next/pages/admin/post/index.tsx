import { useRouter } from "next/router";
import { useEffect } from "react";
import { AdminLayout } from "../../../layouts/admin-layout";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/post/list");
  });

  return null;
}

Admin.Layout = AdminLayout