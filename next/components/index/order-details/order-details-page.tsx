import Link from "next/link";
import { ProfileUser } from "../order-history/component/profile-user";
import { OrderDetailsHeader } from "./components/order-details-header";
import { OrderDetailsTimeline } from "./components/order-details-timeline";
import { OrderDetailsInfo } from './components/order-details-info';
import { OrderDetailsProducts } from './components/order-details-products';
import { ProductsData } from './../../shared/product/data/product-data';
import { PayMoney } from './../cart/component/pay-money';
import { listMoneyCheckout } from "../checkout/component/form-check-data";
import { NumberPipe } from "../../../lib/pipes/number";

const timelines = [
    {
        datetime: new Date(2021, 2, 4, 1, 47),
        content: '[Bưu Cục 1017 Huỳnh Tấn Phát-Q.7-HCM ] Giao hàng thành công'
    }, 
    {
        datetime: new Date(2021, 2, 4, 8, 39),
        content: '[Bưu Cục 1017 Huỳnh Tấn Phát-Q.7-HCM ]Đang giao hàng'
    }, 
    {
        datetime: new Date(2021, 2, 4, 6, 24),
        content: '[Bưu Cục 1017 Huỳnh Tấn Phát-Q.7-HCM ]Nhập bưu cục giao'
    }, 
    {
        datetime: new Date(2021, 2, 4, 5, 12),
        content: '[Bưu cục 1106A Tỉnh lộ 10-Q.Bình Tân-HCM]Chờ xuất đến kho trung chuyển.'
    }, 
    {
        datetime: new Date(2021, 2, 4, 5, 3),
        content: '[Bưu cục 1106A Tỉnh lộ 10-Q.Bình Tân-HCM]Đang lấy hàng.'
    }, 
]
export function OrderDetailsPage () {
    return  <>
            <div className="main-container h-auto px-4">
                <div className="grid grid-rows-1">
                    <div className="breadbcrum__reward-point">
                        <ul className="breadbcrum__reward-point-list flex h-10 items-center mt-8 uppercase">
                            <Link href="/">
                                <a className="breadbcrum__reward-point-link hover:text-primary mr-1"> Trang chủ</a>
                            </Link>
                            <span> / </span>
                            <Link href="/profile/reward-point">
                                <a className="breadbcrum__reward-point-link text-primary ml-1"> Chi tiết đơn hàng</a>
                            </Link>
                        </ul>
                    </div>
                    <div className="oder-account w-full flex justify-between mt-10 my-28">
                        <div className="account__user w-1/4">
                            <ProfileUser activeIndex={3}/>
                        </div>
                        <div className="flex-grow">
                            <OrderDetailsHeader id="210202USQ0UB" status="success"/>
                            <OrderDetailsTimeline timelines={timelines}/>
                            <OrderDetailsInfo 
                                name="Minh Đức Uy"
                                phone="0914357862"
                                address="42 Hoa Huệ, Phường 7, Quận Phú Nhuận, thành phố Hồ Chí Minh"
                                deliveryType="Giao trong ngày"
                                deliveryExpectedDate="Thời gian giao dự kiến 12/01/2020"
                                paymentType="Chuyển khoản"
                                paymentStatus="Thanh toán thành công"
                            />
                            <OrderDetailsProducts products={[...ProductsData, ...ProductsData].filter(x => x.price)}/>
                            <div className="flex justify-end mt-3">
                                <div className="min-w-xs">
                                    <PayMoney listMoney={listMoneyCheckout} />
                                    <div className="flex justify-between pt-2 border-t-2 border-gray-200">
                                        <p className="text-lg">Thành tiền</p>
                                        <p className="font-bold text-primary text-lg">{NumberPipe(1223000, true)}</p>
                                    </div>
                                </div>                    
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
    </>;
}