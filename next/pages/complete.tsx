import { DefaultLayout } from '../layouts/default-layout';
import { CompletedPage } from '../components/index/completed/completed-page';

export default function Completed() {
    return <>
        <CompletedPage />
    </>
}
Completed.Layout = DefaultLayout