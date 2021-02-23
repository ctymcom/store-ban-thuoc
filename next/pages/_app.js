// import "tailwindcss/tailwind.css";
import "../style/style.scss";
import { AuthProvider } from "../lib/providers/auth-provider";
import React from "react";

export default function App({ Component, pageProps }) {
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  const layoutProps = Component.LayoutProps ? Component.LayoutProps : {};

  return (
    <AuthProvider>
      <Layout {...layoutProps}>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
