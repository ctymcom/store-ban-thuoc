import "../style/style.scss";
import { AuthProvider } from "../lib/providers/auth-provider";
import { ToastProvider } from "../lib/providers/toast-provider";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};

  return (
    <ToastProvider>
      <AuthProvider>
        <Layout {...layoutProps}>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ToastProvider>
  );
}
