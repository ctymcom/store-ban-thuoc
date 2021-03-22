import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ProductDetailsPage } from "../../components/index/product-details/product-details";
import { ProductDetailsProvider } from "../../components/index/product-details/providers/product-details-provider";
import { Redirect } from "../../lib/helpers/redirect";
import SEO from "../../lib/helpers/seo";
import { Product } from "../../lib/repo/product.repo";
import { ProductModel } from "./../../../dist/graphql/modules/product/product.model";
import { AritoHelper } from "../../../dist/helpers/arito/arito.helper";
import { DefaultLayout } from "./../../layouts/default-layout";
import { NextSeo } from "next-seo";

interface PropsType extends ReactProps {
  id: string;
  seo: any;
}

export default function Page(props: PropsType) {
  return (
    <>
      <NextSeo {...props.seo} />
      <ProductDetailsProvider productId={props.id}>
        <ProductDetailsPage />
      </ProductDetailsProvider>
    </>
  );
}
Page.Layout = DefaultLayout;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code } = context.query;
  const product = await ProductModel.findOne({ code }, "_id name imageId description code");
  if (!product) Redirect(context.res, "/404");
  product
    .updateOne({ $inc: { view: 1 } })
    .exec()
    .catch((err) => {});
  const seo = await SEO(product.name, {
    description: product.description,
    image: AritoHelper.getImageLink(product.imageId),
  });
  return {
    props: JSON.parse(
      JSON.stringify({
        id: product.id,
        seo,
      })
    ),
  };
}
