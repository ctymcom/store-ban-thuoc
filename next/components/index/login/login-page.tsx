import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuth } from "../../../lib/providers/auth-provider";
import { Login } from './components/login';
import { Register } from './components/register';

export default function LoginPage() {

  const [mode, setMode] = useState<'login' | 'register' | 'forget_password'>('login');
  const { user, checkUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (checkUser()) {
      router.replace('/')
    }
  }, []);

  return <>
    {
      user !== null ? null : 
      <div 
        className="w-screen h-screen bg-center bg-no-repeat bg-cover flex-center" 
        style={{ backgroundImage: `url(/assets/img/background.jpg)`}}>
        <div className="relative flex flex-col items-center bg-white shadow-lg rounded-lg border-primary border-4 min-h-sm p-4 sm:p-8 md:p-10 pt-24 md:pt-24">
          <Link href="/">
            <a className="absolute -top-12">
              <img src='/assets/img/logo.png/' className="w-40"/>
            </a>
          </Link>
          {
            {
              'login': <Login setMode={setMode}/>,
              'register': <Register setMode={setMode}/>,
              'forget_password': null
            }[mode]
          }
        </div>
      </div>
    }
  </>
}