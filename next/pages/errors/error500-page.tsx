import { Footer } from "../../layouts/components/footer";
import { HeadSEO } from "../../layouts/components/head-seo";
import { Error500 } from "./component/error500";
import { HeaderErrorPage } from "./component/header";

export function Error404Page() {
    return <>
        <HeadSEO title='Không tìm thấy trang' />
        <HeaderErrorPage />
        <Error500 />
        <Footer />
    </>
}