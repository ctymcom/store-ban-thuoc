import { IngredientsPage } from "../components/index/ingredients/ingredients-page";
import { IngredientProvider } from "../components/index/ingredients/providers/ingredient-provider";
import { DefaultLayout } from "../layouts/default-layout";
import { NextSeo } from "next-seo";
import SEO from "../lib/helpers/seo";

export default function Ingredients(props) {
  return (
    <>
      <NextSeo {...props.seo} />
      <IngredientProvider>
        <IngredientsPage />
      </IngredientProvider>
    </>
  );
}

Ingredients.Layout = DefaultLayout;

export async function getServerSideProps(context) {
  const seo = await SEO("Danh sách hoạt chất");
  return {
    props: JSON.parse(
      JSON.stringify({
        seo,
      })
    ),
  };
}
