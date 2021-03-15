import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { ProductDetailsPage } from "../../components/index/product-details/product-details";
import { ProductDetailsProvider } from "../../components/index/product-details/providers/product-details-provider";
import { Redirect } from "../../lib/redirect";
import { Product } from "../../lib/repo/product.repo";
import { ProductModel } from "./../../../dist/graphql/modules/product/product.model";
import { AritoHelper } from "../../../dist/helpers/arito/arito.helper";
import { DefaultLayout } from "./../../layouts/default-layout";

interface PropsType extends ReactProps {
  product: Product;
}

export default function Page(props: PropsType) {
  if (!props.product) {
    const router = useRouter();
    router.replace("/products");
  }

  return props.product ? (
    <ProductDetailsProvider productId={props.product.id}>
      <ProductDetailsPage />
    </ProductDetailsProvider>
  ) : null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { code } = context.query;
  const product = (await ProductModel.findOne({ code })) as Product;
  if (!product) Redirect(context.res, "/404");
  return {
    props: {
      product: JSON.parse(
        JSON.stringify({
          id: product.id,
          name: product.name,
          code: product.code,
          image: AritoHelper.getImageLink(product.imageId),
        })
      ),
    },
  };
}

Page.Layout = DefaultLayout;
