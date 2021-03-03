import { IngredientsPage } from "../components/index/ingredients/ingredients-page";
import { IngredientProvider } from "../components/index/ingredients/providers/ingredient-provider";
import { DefaultLayout } from "../layouts/default-layout";

export default function Ingredients() {
  return <IngredientProvider>
      <IngredientsPage/>
  </IngredientProvider>
}

Ingredients.Layout = DefaultLayout