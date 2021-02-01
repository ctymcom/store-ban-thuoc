import { Header } from "../../../layouts/components/header";
import { DefaultLayout } from "../../../layouts/default-layout";
import { Home } from "./component/home";

export function HomePage() {
    return <>
        <DefaultLayout breadcrumbs={[]}>
            <Home />
        </DefaultLayout>
    </>
}