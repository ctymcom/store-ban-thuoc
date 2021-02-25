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
    if (checkUser() === true) {
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
          <img src='/assets/img/logo.png/' className="absolute w-40 -top-12"/>
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