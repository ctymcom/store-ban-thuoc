import "../style/style.scss";
import { AuthProvider } from "../lib/providers/auth-provider";
import { ToastProvider } from "../lib/providers/toast-provider";
import { DefaultSeo } from 'next-seo'
import { AlertProvider } from "../lib/providers/alert-provider";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};

  return (
    <>
     <DefaultSeo
      titleTemplate="%s | Kho thuốc sỉ"
      defaultTitle="Kho thuốc sỉ"
      openGraph={{
        type: 'website',
        locale: 'vi_VN',
        url: 'http://khothuocsi.arito.vn/',
        site_name: 'Kho thuốc sỉ',
      }}
    />
    <ToastProvider>
      <AlertProvider>
        <AuthProvider>
          <Layout {...layoutProps}>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </AlertProvider>
    </ToastProvider>
  
  </>)
}
