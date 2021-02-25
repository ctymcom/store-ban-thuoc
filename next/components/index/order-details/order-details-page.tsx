import { OrderDetailsHeader } from "./components/order-details-header";
import { OrderDetailsTimeline } from "./components/order-details-timeline";
import { OrderDetailsInfo } from './components/order-details-info';
import { OrderDetailsProducts } from './components/order-details-products';
import { ProductsData } from './../../shared/product/data/product-data';
import { PayMoney } from '../cart/components/pay-money';
import { listMoneyCheckout } from "../checkout/components/form-check-data";
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
            <div className="h-auto w-9/12 ml-4">
                <div className="grid grid-rows-1">
                    <div className="oder-account w-full flex justify-between mt-0 my-28">
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