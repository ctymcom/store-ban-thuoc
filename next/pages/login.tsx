import { NoneLayout } from "./../layouts/none-layout";
import LoginPage from "./../components/index/login/login-page";
import { NextSeo } from "next-seo";

export default function Login(props) {
  return (
    <>
      <NextSeo title="Trang đăng nhập" />
      <LoginPage />
    </>
  );
}

Login.Layout = NoneLayout;
