import { useEffect } from "react";
import { useAuth } from "../lib/providers/auth-provider";
import { CartProvider } from "../lib/providers/cart-provider";
import { Footer } from "./default-layout/footer";
import { HeadSEO } from "./default-layout/head-seo";
import { Header } from "./default-layout/header/header";
import { DefaultLayoutProvider } from "./default-layout/providers/default-layout-providers";
import useDevice from "./../lib/hooks/useDevice";
import MessengerChat from "./default-layout/messenger-chat";
import { NotificationProvider } from "../components/index/notification/providers/notifications-provider";

interface PropsType extends ReactProps {
  title?: string;
}

export function DefaultLayout({ title = "Kho Thuốc Sỉ", ...props }: PropsType) {
  const { checkUser } = useAuth();
  const { isSSR } = useDevice();

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <HeadSEO />

      <CartProvider>
        <DefaultLayoutProvider>
          <NotificationProvider>
            <Header />
            <div className="w-full" style={{ minHeight: "60vh" }}>
              {props.children}
            </div>
            <Footer />
            <MessengerChat language="vi" themeColor="#42B54A" pageId="102164275124516" />
          </NotificationProvider>
        </DefaultLayoutProvider>
      </CartProvider>
    </>
  );
}
