import { HomePage } from "../components/index/home/home-page";
import { DefaultLayout } from "../layouts/default-layout";
import { NextSeo } from "next-seo";
import SEO from "../lib/helpers/seo";

export default function Home(props) {
  return (
    <>
      <NextSeo {...props.seo} />
      <HomePage />
    </>
  );
}

Home.Layout = DefaultLayout;

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
