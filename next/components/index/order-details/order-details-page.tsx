import { OrderDetailsHeader } from "./components/order-details-header";
import { OrderDetailsTimeline } from "./components/order-details-timeline";
import { OrderDetailsInfo } from './components/order-details-info';
import { OrderDetailsProducts } from './components/order-details-products';
import { PayMoney } from '../cart/components/pay-money';
import { listMoneyCheckout } from "../checkout/components/form-check-data";
import { NumberPipe } from "../../../lib/pipes/number";

const ProductsData = [
    {
        name: 'Taniki 80mg Nic Pharma (H/60v)',
        categories: [{
            name: 'Cơ xương khớp'
        }],
        price: 645000,
        sale: 516000,
        saleValue: 50,
        packagingUnit: 'Hộp 20gr',
        image: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/141962889_244374043814739_723707079281059873_n.png?_nc_cat=109&ccb=2&_nc_sid=ae9488&_nc_ohc=7EU0W7kWKMQAX9i7w7K&_nc_ht=scontent.fsgn5-6.fna&oh=fe55deea5135ba2542c38d0661065fd9&oe=603301A7',
        tags: ['Sản phẩm mới', 'Bán chạy', 'Độc quyền'],
        isNew: true
    },
    {
        name: 'Apruxton Almagat 1,5g/15ml Theragen (H/20gói)',
        categories: [{
            name: 'Kháng sinh'
        }, {
            name: 'Nấm'
        }],
        price: null,
        packagingUnit: 'Hộp 20gr',
        image: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/141418120_876512606514879_6851203469593623690_n.png?_nc_cat=100&ccb=2&_nc_sid=ae9488&_nc_ohc=rza8oOVD_GIAX8IggCB&_nc_ht=scontent.fsgn5-5.fna&oh=4e3193af3d5b74d866d72f6bdb8d2a23&oe=6030986D',
        tags: ['Flash Sale']

    },
    {
        name: 'Hemifere 100mg Schazoo (H/30v)',
        categories: [{
            name: 'Da liễu'
        }],
        price: 1245000,
        sale: 516000,
        packagingUnit: 'Hộp 20gr',
        image: 'https://scontent.fsgn5-2.fna.fbcdn.net/v/t1.15752-9/141441082_266663471554853_8815194168553596317_n.png?_nc_cat=107&ccb=2&_nc_sid=ae9488&_nc_ohc=p_LFNCtAa4sAX-0Pvdz&_nc_ht=scontent.fsgn5-2.fna&oh=1e5a747b15132b006264d2a1fb8db6b9&oe=6031E863',
        tags: [],
        isNew: true
    },
    {
        name: 'Sulficin Sulpirid 50mg Capsules Nic Pharma (C/200v)',
        categories: [{
            name: 'Kháng viêm'
        }, {
            name: 'Dị ứng'
        }],
        price: null,
        packagingUnit: 'Hộp 20gr',
        image: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t1.15752-9/141396200_883940085483468_7257409348769921816_n.png?_nc_cat=111&ccb=2&_nc_sid=ae9488&_nc_ohc=3rEBkQKvt9sAX-2JcdW&_nc_ht=scontent.fsgn5-3.fna&oh=8a1daceed5473a755b630b777e94a875&oe=6030A09D',
        tags: ['Sản phẩm mới']
    }
    ,
    {
        name: 'Denatri Alfacalcidol Capsules Phil Inter Pharma (H/100v)',
        categories: [{
            name: 'Dầu xoa'
        }, {
            name: 'Cao xoa'
        }],
        price: 35000,
        sale: 516000,
        saleValue: 50,
        packagingUnit: 'Hộp 20gr',
        image: 'https://scontent.fsgn5-6.fna.fbcdn.net/v/t1.15752-9/141709285_170933281066921_2862164185176936454_n.png?_nc_cat=106&ccb=2&_nc_sid=ae9488&_nc_ohc=rWkx3RKbdx8AX982cTo&_nc_ht=scontent.fsgn5-6.fna&oh=3fc2bacdd9968c57a23551cd138adb0b&oe=6032BA73',
        tags: ['Sản phẩm mới', 'Độc quyền']
    },
] 

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
            <div className="h-auto w-full lg:w-full ml-0 lg:ml-4 px-3 lg:px-0">
                <div className="">
                    <div className="w-full flex justify-between">
                        <div className="w-full">
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
                            <div className="flex justify-end w-full mt-7 lg:mt-3">
                                <div className="min-w-full sm:min-w-xs ">
                                    <PayMoney listMoney={listMoneyCheckout} />
                                    <div className="flex justify-between mt-5 md:mt-0 py-2 md:pt-2 border-t-4 border-b-4 md:border-b-0 border-gray-200">
                                        <p className="text-md lg:text-lg uppercase md:normal-case font-extralight">Thành tiền</p>
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