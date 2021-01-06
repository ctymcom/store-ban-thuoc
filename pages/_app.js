import "tailwindcss/tailwind.css";

import { AuthProvider } from "../next/providers/auth-provider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />;
    </AuthProvider>
  );
}
