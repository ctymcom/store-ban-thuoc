import { IconShip, IconHandHeart, IconMap, IconShoppingOnline } from "../../../lib/svg";
import { NewsData } from "./news-data";
import { ProductData } from "./product-data";

export function Home() {
    return <>
        <div className="w-full">
            <img src="https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141910721_420388555702107_6501062765822356905_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=7sMouzaypgYAX84T7oT&_nc_ht=scontent-sin6-3.xx&oh=ed4e5bdb35b5240951c2b4e49569d54e&oe=602FCB5F" alt="" />
        </div>
        <div className="container-1 grid grid-cols-3 gap-3 py-12">
            <img src="https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141222954_246218120278719_5997877537810110707_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=N5JqCqaZ5AkAX-OHW6Y&_nc_ht=scontent-sin6-3.xx&oh=9e53fac0abc201ab863fb42569c343b1&oe=60325062" alt="" />
            <img src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141639150_1376730039331224_3415912069657551318_n.png?_nc_cat=108&ccb=2&_nc_sid=ae9488&_nc_ohc=Tbi6IjdbXgIAX-BksVK&_nc_ht=scontent-sin6-2.xx&oh=0263df91ee9e033e494b21a9b4670c5b&oe=602FD3D3" alt="" />
            <img src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t1.15752-9/141205153_1075912362821373_3184814676590729168_n.png?_nc_cat=100&ccb=2&_nc_sid=ae9488&_nc_ohc=QmggNykV2PoAX_tvKkm&_nc_ht=scontent.fsgn5-5.fna&oh=23c70a2e04a4f26d73a1f3f44fbc89ed&oe=60313800" alt="" />
            <img src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141790569_228069908910905_9027221011818501028_n.png?_nc_cat=102&ccb=2&_nc_sid=ae9488&_nc_ohc=DHs-nUkTfFcAX8iog8I&_nc_ht=scontent-sin6-2.xx&oh=bce7ddc72e39e1142335f8b72a08d78a&oe=602FA7DC" alt="" />
            <img src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141531610_670227540313641_4358901841505878016_n.png?_nc_cat=105&ccb=2&_nc_sid=ae9488&_nc_ohc=Zms3pzr8VjQAX85CPjB&_nc_ht=scontent-sin6-2.xx&oh=d203c7618bee1ce82f614ffbd0fb5c96&oe=602E98E8" alt="" />
            <img src="https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141038697_321624412524295_4311571797850030468_n.png?_nc_cat=105&ccb=2&_nc_sid=ae9488&_nc_ohc=g88YJKDvvmMAX9r7833&_nc_ht=scontent-sin6-2.xx&oh=e9c0b63a0889ad0c00f87f2eaa6110db&oe=6030EB91" alt="" />
        </div>
        <div className="container-1 py-8">
            <div className="justify-center w-full">
                <h6 className='uppercase text-center'>Sản phẩm bán chạy</h6>
            </div>
            <div className="grid grid-cols-5 gap-8 py-8">
                {
                    ProductData.map((item, index) => {
                        return <div className="Product" key={index}>
                            < div className="flex flex-col" >
                                <div className="img-item flex justify-center items-center max-w-sm h-48 relative">
                                    <img src={item.img} alt="" className='w-36 max-h-48' />
                                    <div className="btn-readmore absolute bottom-0 w-full bg-green-400 text-center text-white text-sm rounded">
                                        <div className="w-full py-1 cursor-pointer">Xem nhanh</div>
                                    </div>
                                </div>
                                <div className="py-1">
                                    <p className="text-sm text-gray-400">{item.type}</p>
                                </div>
                                <div className="h-16">
                                    <p className="">{item.name}</p>
                                </div>
                                <div className="">
                                    <div className="line-through text-green-200 text-sm">{item.price}</div>
                                    <div className="flex space-x-1 items-center">
                                        <p className="text-green-500">{item.sale}</p>
                                        <p className="text-sm text-gray-400"> /Hộp</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 items-center py-2">
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400 rounded text-green-400">Thêm vào giỏ</div>
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400  rounded text-white bg-green-400">Mua ngay</div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
        <div className="container-1 py-8">
            <div className="justify-center w-full">
                <h6 className='uppercase text-center'>Sản phẩm mới</h6>
            </div>
            <div className="grid grid-cols-5 gap-8 py-8">
                {
                    ProductData.map((item, index) => {
                        return <div className="Product" key={index}>
                            < div className="flex flex-col" >
                                <div className="img-item flex justify-center items-center max-w-sm h-48 relative">
                                    <img src={item.img} alt="" className='w-36 max-h-48' />
                                    <div className="btn-readmore absolute bottom-0 w-full bg-green-400 text-center text-white text-sm rounded">
                                        <div className="w-full py-1 cursor-pointer">Xem nhanh</div>
                                    </div>
                                </div>
                                <div className="py-1">
                                    <p className="text-sm text-gray-400">{item.type}</p>
                                </div>
                                <div className="h-16">
                                    <p className="">{item.name}</p>
                                </div>
                                <div className="">
                                    <div className="line-through text-green-200 text-sm">{item.price}</div>
                                    <div className="flex space-x-1 items-center">
                                        <p className="text-green-500">{item.sale}</p>
                                        <p className="text-sm text-gray-400"> /Hộp</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 items-center py-2">
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400 rounded text-green-400">Thêm vào giỏ</div>
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400  rounded text-white bg-green-400">Mua ngay</div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
        <div className="container-1 py-8">
            <div className="justify-center w-full">
                <h6 className='uppercase text-center'>Chỉ có tại khothuocsi.vn</h6>
            </div>
            <div className="grid grid-cols-5 gap-8 py-8">
                {
                    ProductData.map((item, index) => {
                        return <div className="Product" key={index}>
                            < div className="flex flex-col" >
                                <div className="img-item flex justify-center items-center max-w-sm h-48 relative">
                                    <img src={item.img} alt="" className='w-36 max-h-48' />
                                    <div className="btn-readmore absolute bottom-0 w-full bg-green-400 text-center text-white text-sm rounded">
                                        <div className="w-full py-1 cursor-pointer">Xem nhanh</div>
                                    </div>
                                </div>
                                <div className="py-1">
                                    <p className="text-sm text-gray-400">{item.type}</p>
                                </div>
                                <div className="h-16">
                                    <p className="">{item.name}</p>
                                </div>
                                <div className="">
                                    <div className="line-through text-green-200 text-sm">{item.price}</div>
                                    <div className="flex space-x-1 items-center">
                                        <p className="text-green-500">{item.sale}</p>
                                        <p className="text-sm text-gray-400"> /Hộp</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 items-center py-2">
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400 rounded text-green-400">Thêm vào giỏ</div>
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400  rounded text-white bg-green-400">Mua ngay</div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
        <div className="container-1 py-8">
            <div className="justify-center w-full">
                <h6 className='uppercase text-center'>Lựa chọn của bạn</h6>
            </div>
            <div className="grid grid-cols-5 gap-8 py-8">
                {
                    ProductData.map((item, index) => {
                        return <div className="Product" key={index}>
                            < div className="flex flex-col" >
                                <div className="img-item flex justify-center items-center max-w-sm h-48 relative">
                                    <img src={item.img} alt="" className='w-36 max-h-48' />
                                    <div className="btn-readmore absolute bottom-0 w-full bg-green-400 text-center text-white text-sm rounded">
                                        <div className="w-full py-1 cursor-pointer">Xem nhanh</div>
                                    </div>
                                </div>
                                <div className="py-1">
                                    <p className="text-sm text-gray-400">{item.type}</p>
                                </div>
                                <div className="h-16">
                                    <p className="">{item.name}</p>
                                </div>
                                <div className="">
                                    <div className="line-through text-green-200 text-sm">{item.price}</div>
                                    <div className="flex space-x-1 items-center">
                                        <p className="text-green-500">{item.sale}</p>
                                        <p className="text-sm text-gray-400"> /Hộp</p>
                                    </div>
                                </div>
                                <div className="flex space-x-2 items-center py-2">
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400 rounded text-green-400">Thêm vào giỏ</div>
                                    <div className="cursor-pointer text-sm px-3 py-1 border border-green-400  rounded text-white bg-green-400">Mua ngay</div>
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
        <div className="container-1 flex py-8">
            <div className="p-4 flex items-center flex-col">
                <div className="w-16">
                    <IconShip />
                </div>
                <div className="uppercase py-4 text-green-400">
                    Miễn phí giao vận
                </div>
                <div className="descrip">
                    <p className="text-center">Miễn phí vận chuyển cho các đơn hàng trên 300,000VNĐ và nhận hàng nhanh chóng.</p>
                </div>
            </div>
            <div className="border-l"></div>
            <div className="p-4 flex items-center flex-col">
                <div className="w-16">
                    <IconHandHeart />
                </div>
                <div className="uppercase py-4 text-green-400">
                    TẬN TÂM PHỤC VỤ
                </div>
                <div className="descrip">
                    <p className="text-center">Dịch vụ chăm sóc khách hàng chuyên nghiệp luôn sẵn sàng giải đáp mọi thắc mắc của bạn. Hotline miễn phí: 1800 6821</p>
                </div>
            </div>
            <div className="border-l"></div>
            <div className="p-4 flex items-center flex-col">
                <div className="w-16">
                    <IconMap />
                </div>
                <div className="uppercase py-4 text-green-400">
                    CỬA HÀNG GẦN BẠN
                </div>
                <div className="descrip">
                    <p className="text-center">Pharmacity đang mở rộng hệ thống cửa hàng gần bạn để chăm sóc bạn tốt hơn. Hãy ghé thăm và trải nghiệm nhé!</p>
                </div>
            </div>
            <div className="border-l"></div>
            <div className="p-4 flex items-center flex-col">
                <div className="w-20">
                    <IconShoppingOnline />
                </div>
                <div className="uppercase py-4 text-green-400">
                    MUA HÀNG TRỰC TUYẾN
                </div>
                <div className="descrip">
                    <p className="text-center">Giá bán trên trang chỉ áp dụng khi mua sắm trên trang thương mại điện tử của Pharmacity.</p>
                </div>
            </div>
        </div>
        <div className="w-full py-8">
            <img src="https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141910721_420388555702107_6501062765822356905_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=7sMouzaypgYAX84T7oT&_nc_ht=scontent-sin6-3.xx&oh=ed4e5bdb35b5240951c2b4e49569d54e&oe=602FCB5F" alt="" />
        </div>
        <div className="container-1 py-8">
            <div className="justify-center w-full">
                <h6 className='uppercase text-center'>Tin mới nhất</h6>
            </div>
            <div className="grid grid-cols-4 gap-8 py-8">
                {
                    NewsData.map((item, index) => {
                        return <div className="flex items-center flex-col cursor-pointer hover:shadow" key={index}>
                            <div className="img">
                                <img src={item.img} alt="" className='w-full h-auto' />
                            </div>
                            <div className="px-4 py-3 h-16">
                                <p className="text-center text-sm">{item.title}</p>
                            </div>
                            <div className="px-4 py-3">
                                <p className="text-center text-xs text-gray-400">{item.description}</p>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    </>
}