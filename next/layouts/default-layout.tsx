import { useEffect } from "react";
import { useAuth } from "../lib/providers/auth-provider";
import { CartProvider } from "../lib/providers/cart-provider";
import { Footer } from "./default-layout/footer";
import { HeadSEO } from "./default-layout/head-seo";
import { Header } from "./default-layout/header/header";
import { DefaultLayoutProvider } from "./default-layout/providers/default-layout-providers";
import { FooterProvider } from "./default-layout/providers/footer-providers";
import { HeaderProvider } from "./default-layout/providers/header-provider";
// import Sidebar from './components/sidebar';

interface PropsType extends ReactProps {
  title?: string
}

export function DefaultLayout({
  title = "Kho Thuốc Sỉ",
  ...props
}: PropsType) {

  const { checkUser } = useAuth()

  useEffect(() => {
    checkUser()
  }, []);

  return (
    <>
      <HeadSEO title={title}></HeadSEO>
      
      <CartProvider>
        <DefaultLayoutProvider>
          <Header/>
          <div className="w-full" style={{ minHeight: '60vh' }}>
            {props.children}
          </div>
          <Footer/>
        </DefaultLayoutProvider>
      </CartProvider>
    </>
  );
}
