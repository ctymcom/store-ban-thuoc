// import "tailwindcss/tailwind.css";
import '../style/style.scss'
import { AuthProvider } from "../providers/auth-provider";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
