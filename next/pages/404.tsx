import NotFoundPage from "../components/index/404/404-page";
import { DefaultLayout } from "../layouts/default-layout";
import { NextSeo } from "next-seo";

export default function NotFound() {
  return (
    <>
      <NextSeo title="Không tìm thấy trang" />
      <NotFoundPage />
    </>
  );
}
NotFound.Layout = DefaultLayout;
