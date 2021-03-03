import { IconFacebook } from "../../../public/assets/icons/icon-facebook";
import { IconYoutube } from "../../../public/assets/icons/icon-youtube";
import { IconZalo } from "../../../public/assets/icons/icon-zalo";

export function FooterHotline(props) {
  return <>
    <div className="">
      <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">Đăng kí nhận tin mới</div>
      <div className="text-sm sm:text-base md:text-lg sm:py-1 md:py-0 mt-2 sm:mt-1 md:mt-0 lg:mt-3">Hãy đăng ký email để nhận được khuyến mãi</div>
      <div className="py-6 sm:py-10 md:py-10 lg:py-8 flex w-full sm:w-8/12 md:w-11/12 lg:w-full">
        <input
          type="text"
          className="text-gray-800 w-full md:w-7/12 lg:w-10/12 px-4 sm:px-6 md:px-5 py-2 sm:py-2 md:py-4 lg:py-3 text-lg sm:text-base md:text-sm lg:text-base border-primary border-2 md:border-0 md:border-opacity-0 focus:outline-none rounded-l-full"
          placeholder="Nhập email của bạn"
        />
        <div className="uppercase bg-primary font-semibold text-sm md:text-base whitespace-nowrap px-4 sm:px-7 md:px-8 sm:py-2 md:py-0 flex items-center justify-center cursor-pointer rounded-r-full">
          Đăng kí
        </div>
      </div>
    </div>
    <div className="">
      <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">Kết nối với chúng tôi</div>
      <div className="flex space-x-5 sm:space-x-8 md:space-x-7 mb-4 sm:mb-7 md:mb-8 lg:mb-8 mt-4 sm:mt-7 md:mt-4 lg:mt-4 items-center">
        <div className="transition w-3 sm:w-5 md:w-4 lg:w-5 cursor-pointer text-gray-400 hover:text-blue-500">
          <IconFacebook />
        </div>
        <div className="transition w-7 sm:w-10 md:w-8 lg:w-10 cursor-pointer text-gray-400 hover:text-red-500">
          <IconYoutube />
        </div>
        <div className="transition cursor-pointer text-gray-400 hover:text-blue-500">
          <IconZalo />
        </div>
      </div>
    </div>
    <div className="">
      <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">Hotline miễn phí (7h-22h)</div>
      <div className="text-sm sm:text-base md:text-lg sm:py-1 md:py-2 ">
        <p className="mb-1 md:mb-1">Gọi điện đặt hàng: 1900 6067</p>
        <p className="">Gọi điện tư vấn - hỗ trợ: 1900 6067</p>
      </div>
    </div>
  </>
}