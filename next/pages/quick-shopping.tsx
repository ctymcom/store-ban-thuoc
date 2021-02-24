
import { QuickShoppingProvider } from "../components/index/quick-shopping/providers/quick-shopping-provider";
import { DefaultLayout } from "../layouts/default-layout";
import { QuickShoppingPage } from './../components/index/quick-shopping/quick-shopping';


export default function QuickShopping() {
    return <QuickShoppingProvider>
        <QuickShoppingPage />
    </QuickShoppingProvider>
}

QuickShopping.Layout = DefaultLayout