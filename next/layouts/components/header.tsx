import { IconCart, IconSearch, LogoNhaThuoc } from "../../lib/svg";

export function Header() {
    return <>
        <div className="w-full">
            <div className="container-1 flex items-center py-2 bg-gray-200 justify-end text-xs">
                <p className="text text-gray-400 cursor-pointer ml-5">Tin tức</p>
                <p className="text text-gray-400 cursor-pointer ml-5">Tuyển dụng</p>
                <p className="text text-gray-400 cursor-pointer ml-5">Trở thành nhà bán thuốc</p>
            </div>
            <div className="container-1 py-6 grid grid-cols-4">
                <div className="w-16 ">
                    <LogoNhaThuoc />
                </div>
                <div className="search col-span-2 flex items-center w-full">
                    <div className="relative flex items-center w-full">
                        <input type="text"
                            placeholder='Tìm kiếm'
                            className='py-2 px-12  w-full bg-white ring-gray-300 ring-1 text-sm text-gray-500 rounded-full focus:outline-none focus:ring-gray-400 '
                        />
                        <div className="absolute icon w-4 text-gray-400 z-50 left-5">
                            <IconSearch />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-end text-gray-500">
                    <div className=" px-3 cursor-pointer">
                        Đăng nhập
                </div>
                    <div className="border-l border-gray-300 px-3 flex items-center cursor-pointer">
                        <div className="pr-2">
                            Giỏ hàng
                    </div>
                        <div className="w-8">
                            <IconCart />
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-1 bg-primary-400 py-2 text-white flex items-center justify-between">
                <div className="">
                    <ul className='flex text-sm space-x-6'>
                        <li className="cursor-pointer">Sản phẩm</li>
                        <li className="cursor-pointer">Hoạt chất</li>
                        <li className="cursor-pointer">Khuyến mãi</li>
                        <li className="cursor-pointer">Tin tức sức khỏe</li>
                    </ul>
                </div>
                <div className="text-sm flex space-x-1">
                    <p className="">HOTLINE: </p>
                    <b className="text-yellow-200"> 1900 6067 </b> (miễn phí)
            </div>
            </div>
        </div>
    </>
}