import { QuickShoppingProvider } from "../components/index/quick-shopping/providers/quick-shopping-provider";
import { DefaultLayout } from "../layouts/default-layout";
import { QuickShoppingPage } from "./../components/index/quick-shopping/quick-shopping";
import { NextSeo } from "next-seo";
import SEO from "../lib/helpers/seo";

export default function QuickShopping(props) {
  return (
    <>
      <NextSeo {...props.seo} />
      <QuickShoppingProvider>
        <QuickShoppingPage />
      </QuickShoppingProvider>
    </>
  );
}

QuickShopping.Layout = DefaultLayout;

export async function getServerSideProps(context) {
  const seo = await SEO("Mua hàng nhanh");
  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
}
