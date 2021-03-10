import Link from "next/link";
import { useRouter } from "next/router";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useAuth } from "../../../lib/providers/auth-provider";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Recovery } from "./components/recovery";
import ReCAPTCHA from "react-google-recaptcha";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register" | "recovery">("login");
  const { user, checkUser } = useAuth();
  const router = useRouter();

  const recaptchaRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    if (checkUser()) {
      router.replace("/");
    }
  }, []);

  useEffect(() => {
    if (router.query["email"]) {
      setMode("register");
    }
  }, [router.query]);

  return (
    <>
      {user !== null ? null : (
        <div
          className="w-screen h-screen bg-center bg-no-repeat bg-cover flex-center"
          style={{ backgroundImage: `url(/assets/img/background.jpg)` }}
        >
          <div className="relative flex flex-col items-center bg-white shadow-lg rounded-lg border-primary border-4 min-h-sm p-4 sm:p-8 md:p-10 pt-24 md:pt-24">
            <Link href="/">
              <a className="absolute -top-12">
                <img src="/assets/img/logo.png/" className="w-40" />
              </a>
            </Link>
            {
              {
                login: <Login setMode={setMode} />,
                register: <Register recaptchaRef={recaptchaRef} setMode={setMode} />,
                recovery: <Recovery setMode={setMode} />,
              }[mode]
            }
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            size="invisible"
            sitekey="6Lf9mHYaAAAAAC6iHPb_CU0qFSq4XFq54BpjTq9B"
          />
        </div>
      )}
    </>
  );
}
