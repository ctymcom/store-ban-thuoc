import { Footer } from './../../../layouts/components/footer';
import { HeadSEO } from './../../../layouts/components/head-seo';
import { Login } from './component/login';


export default function LoginPage() {

  return <>
    <HeadSEO title='Đăng nhập' />
    {/* <HeaderErrorPage /> */}
    <Login />
    <Footer />
  </>
}