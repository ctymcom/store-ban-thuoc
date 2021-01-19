import { Footer } from "../../layouts/components/footer";
import { HeadSEO } from "../../layouts/components/head-seo";
import { Error404 } from "./component/error404";
import { HeaderErrorPage } from "./component/header";

export function Error404Page() {
    return <>
        <HeadSEO title='Không tìm thấy trang' />
        <HeaderErrorPage />
        <Error404 />
        <Footer />
    </>
}