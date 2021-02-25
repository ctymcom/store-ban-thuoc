import { useEffect } from "react";
import { Spinner } from "../components/shared/utilities/spinner";
import { LOGIN_PATHNAME, useAuth } from "../lib/providers/auth-provider";
import Sidebar from "./admin-layout/sidebar";
import { HeadSEO } from './default-layout/head-seo';
import { useRouter } from 'next/router';

interface AdminLayoutProps extends ReactProps {
  title?: string;
};
export function AdminLayout({
  title = "Dashboard Kho Thuốc Sỉ",
  ...props
}: AdminLayoutProps) {

  const router = useRouter()

  const { user, checkUser } = useAuth()
  useEffect(() => {
    sessionStorage.setItem(LOGIN_PATHNAME, router.pathname)
    if (checkUser() === null) {
      router.replace('/admin/login')
    }
    console.log('asdasdasdsad')
  }, []);

  console.log('rerender')
  
  return (
    <>
      <HeadSEO title={title}/>
      {
        !user ? <Spinner/> : 
        <div className="flex w-full h-screen bg-gray-100">
          <div className="flex-shrink-0 w-60 z-10 shadow-md bg-white">
            <Sidebar />
          </div>
          <div className="flex-grow px-6 py-5 h-screen v-scrollbar">
            {props.children}
          </div>
        </div>
      }
    </>
  );
}
