import AdminLoginPage from "../../components/admin/login/admin-login-page";
import { NoneLayout } from './../../layouts/none-layout';

export default function Login() {
    return <AdminLoginPage/>
}
Login.Layout = NoneLayout
Login.LayoutProps = { title: 'Đăng nhập Admin' }