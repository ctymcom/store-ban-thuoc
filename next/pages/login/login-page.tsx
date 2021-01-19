import { useRouter } from 'next/router';
import { Footer } from '../../layouts/components/footer';
import { HeadSEO } from '../../layouts/components/head-seo';
import { HeaderErrorPage } from '../errors/component/header';
import { Login } from './component/login';


export default function LoginPage() {

  return <>
    <HeadSEO title='Đăng nhập' />
    <HeaderErrorPage />
    <Login />
    <Footer />
  </>
}