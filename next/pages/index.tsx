import { useEffect } from "react";
import { useRouter } from "next/router";
import { DefaultLayout } from "../layouts/default-layout";
function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/home");
  });

  return null;
}

Index.Layout = DefaultLayout;
export default Index;
