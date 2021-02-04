import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/post/list-post");
  });

  return null;
}