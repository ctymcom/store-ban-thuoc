import { useRouter } from 'next/router';
import { Footer } from '../../../layouts/components/footer';
import { HeadSEO } from '../../../layouts/components/head-seo';
// import { HeaderErrorPage } from '../errors/component/header';
import { ResetPassword } from './component/reset-password';


export default function ResetPasswordPage() {

    return <>
        <HeadSEO title='Quên mật khẩu' />
        {/* <HeaderErrorPage /> */}
        <ResetPassword />
        <Footer />
    </>
}