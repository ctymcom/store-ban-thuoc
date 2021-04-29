import { NextSeo } from "next-seo";
import { DiscountProvider } from "../components/index/discount/providers/discount-provider";
import { DefaultLayout } from "../layouts/default-layout";
import SEO from "../lib/helpers/seo";
import { DiscountPage } from "./../components/index/discount/discount-page";

export default function QuickShopping(props) {
  return (
    <>
      <NextSeo {...props.seo} />
      <DiscountProvider>
        <DiscountPage />
      </DiscountProvider>
    </>
  );
}

QuickShopping.Layout = DefaultLayout;

export async function getServerSideProps(context) {
  const seo = await SEO("Khuyến mãi");
  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
}
