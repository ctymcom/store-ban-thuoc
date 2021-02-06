import { Footer } from '../../../layouts/default-layout/footer';
import { HeadSEO } from '../../../layouts/default-layout/head-seo';
import { Login } from './component/login';


export default function LoginPage() {

  return <>
    <HeadSEO title='Đăng nhập' />
    {/* <HeaderErrorPage /> */}
    <Login />
    <Footer />
  </>
}