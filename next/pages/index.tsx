import { NextSeo } from "next-seo";
import { HomePage } from "../components/index/home/home-page";
import { DefaultLayout } from "../layouts/default-layout";
import SEO from "../lib/helpers/seo";

export default function Index(props) {

  return (
    <>
      <NextSeo {...props.seo} />
      <HomePage />
    </>
  );
}

Index.Layout = DefaultLayout;

export async function getServerSideProps(context) {
  const seo = await SEO("Trang chủ");
  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
}
