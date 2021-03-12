import { ProductsProvider } from "../components/index/products/providers/products-provider";
import { DefaultLayout } from "../layouts/default-layout";
import SEO from "../lib/helpers/seo";
import { ProductsPage } from "./../components/index/products/products-page";
import { NextSeo } from "next-seo";

export default function Products(props) {
  return (
    <>
      <NextSeo {...props.seo} />
      <ProductsProvider>
        <ProductsPage />
      </ProductsProvider>
    </>
  );
}

Products.Layout = DefaultLayout;

export async function getServerSideProps(context) {
  const seo = await SEO("Danh mục sản phẩm");
  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
}
