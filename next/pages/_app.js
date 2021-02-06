// import "tailwindcss/tailwind.css";
import '../style/style.scss'
import { AuthProvider } from "../providers/auth-provider";
import React from "react";


export default function App({ Component, pageProps }) {  
  const Layout = Component.Layout ? Component.Layout : React.Fragment;
  
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}
