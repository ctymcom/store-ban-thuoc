import { DefaultLayout } from '../layouts/default-layout';
import AddressPage from '../components/index/address/address-page';

export default function Address() {
    return <>
        <AddressPage />
    </>
}
Address.Layout = DefaultLayout