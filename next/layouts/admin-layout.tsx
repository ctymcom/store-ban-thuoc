import { useEffect } from "react";
import { Spinner } from "../components/shared/utilities/spinner";
import { LOGIN_PATHNAME, useAuth } from "../lib/providers/auth-provider";
import Sidebar from "./admin-layout/sidebar";
import { HeadSEO } from "./default-layout/head-seo";
import { useRouter } from "next/router";
import { USER_ROLES } from "../lib/repo/arito-user.repo";

interface AdminLayoutProps extends ReactProps {
  title?: string;
}
export function AdminLayout({ title = "Dashboard Kho Thuốc Sỉ", ...props }: AdminLayoutProps) {
  const router = useRouter();

  const { user, checkUser } = useAuth();
  useEffect(() => {
    sessionStorage.setItem(LOGIN_PATHNAME, router.pathname);
    document.title = "Dashboard - Kho thuốc sỉ";

    checkUser(USER_ROLES.map((x) => x.value)).then((res) => {
      if (!res) {
        router.replace("/admin/login");
      }
    });
  }, []);

  return (
    <>
      <HeadSEO />
      {!user ? (
        <Spinner />
      ) : (
        <div className="flex w-full h-screen bg-gray-100">
          <div className="flex-shrink-0 w-60 z-10 shadow-md bg-white">
            <Sidebar />
          </div>
          <div className="flex-grow px-6 py-5 h-screen v-scrollbar">{props.children}</div>
        </div>
      )}
    </>
  );
}
