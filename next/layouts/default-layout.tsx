import { useEffect } from "react";
import { NotificationProvider } from "../components/index/notification/providers/notifications-provider";
import { useAuth } from "../lib/providers/auth-provider";
import { CartProvider } from "../lib/providers/cart-provider";
import { Footer } from "./default-layout/footer";
import { HeadSEO } from "./default-layout/head-seo";
import { Header } from "./default-layout/header/header";
import MessengerCustomerChat from "react-messenger-customer-chat";
import {
  DefaultLayoutContext,
  DefaultLayoutProvider,
} from "./default-layout/providers/default-layout-providers";

interface PropsType extends ReactProps {
  title?: string;
}

export function DefaultLayout({ title = "Kho Thuốc Sỉ", ...props }: PropsType) {
  const { checkUser } = useAuth();

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
            <DefaultLayoutContext.Consumer>
              {({ pageId }) => (
                <>
                  {pageId && (
                    <MessengerCustomerChat
                      pageId={pageId}
                      appID=""
                      language="vi"
                      themeColor="#42B54A"
                    />
                  )}
                </>
              )}
            </DefaultLayoutContext.Consumer>
          </NotificationProvider>
        </DefaultLayoutProvider>
      </CartProvider>
    </>
  );
}
