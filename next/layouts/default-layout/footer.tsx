import { useState } from "react";
import { IconFacebook } from "../../lib/svg/icon-facebook";
import { IconYoutube } from "../../lib/svg/icon-youtube";
import { IconZalo } from "../../lib/svg/icon-zalo";

export function Footer() {
  const [ShowMore, setShowMore] = useState(false);
  
  return (
    <>
      <footer className=" mt-20 text-white transition">
        <div className=" w-full py-8 sm:py-10 bg-gray-700  flex flex-col lg:grid lg:grid-cols-3 container-1">
          <div className="flex flex-col justify-start text-md sm:text-lg md:text-sm lg:w-4/6 px-2 sm:px-9 md:px-0">
            <div className="uppercase text-primary sm:py-1 md:py-0 md:mb-4 text-xl sm:text-2xl md:text-sm mb-3 sm:mb-0">Về khoThuocsi.vn</div>
            <p className="sm:py-1 md:pb-4 md:leading-5">
              Thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế
            </p>
            <p className="mt-4 md:mt-0 sm:mb-8 md:mb-4 md:leading-5">
              Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
              khắp Việt Nam.
            </p>
            { ShowMore ? (
                          <>
                            <p className="mt-4 sm:-mt-7 md:mt-0 md:mb-4">
                              Là một trong những nơi làm việc thu hút các tài năng trẻ với đam mê ứng dụng công
                              nghệ 4.0 vào nền Y Tế
                            </p>
                          </>
              ) : (
                ""
              )}
              <p
                className="text-yellow-400 cursor-pointer mt-4 sm:-mt-2 md:mt-0"
                onClick={() => {
                  setShowMore(!ShowMore);
                }}
              >
                {ShowMore ? "Thu gọn" : "Tìm hiểu thêm"}
              </p>
          </div>
          <div className="flex flex-col justify-start lg:w-4/6 px-2 sm:px-9 md:px-0 mt-7 sm:mt-6 md:mt-0">
            <div className="uppercase text-primary sm:py-1 md:py-0 md:mb-4 text-xl sm:text-2xl md:text-sm mb-3 md:mt-0">Liên kết hữu ích</div>
            <div className="text-md md:text-sm sm:py-1 md:pb-4">
              <ul>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Quy định sử dụng Website</li>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Chính sách bảo mật</li>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Chính sách bán hàng</li>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Chính sách vận chuyễn</li>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Hướng dẫn thanh toán</li>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Chính sách giải quyết khiếu nại</li>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Các câu hỏi thường gặp</li>
                <li className="pb-2.5 sm:pb-2 md:pb-3 cursor-pointer">Liên hệ</li>
              </ul>
            </div>
            
          </div>
          <div className="flex flex-col justify-start lg:w-5/6 text-sm px-2 sm:px-9 md:px-0 sm:mt-6 md:mt-0">
            <div className="">
              <div className="uppercase text-primary sm:py-1 md:py-0 text-xl sm:text-2xl md:text-sm mb-2 md:mt-0">Đăng kí nhận tin mới</div>
              <div className=" text-base md:text-sm sm:py-1 md:py-2 sm:mb-5 md:mb-2 md:mt-2">Hãy đăng ký email để nhận được khuyến mãi</div>
              <div className="py-4 flex w-full">
                <input
                  type="text"
                  className="text-gray-800 w-full md:w-8/12 lg:w-8/12 px-5 sm:px-7 md:px-5 sm:py-4 md:py-3 sm:text-lg md:text-sm border-primary border-2 md:border-0 md:border-opacity-0 focus:outline-none rounded-l-full"
                  placeholder="Nhập email của bạn"
                />
                <div className="uppercase bg-primary text-base whitespace-nowrap w-6/12 lg:w-4/12 px-2 sm:px-12 md:px-4 py-3 sm:py-2 md:py-0 flex items-center justify-center cursor-pointer rounded-r-full">
                  Đăng kí
                </div>
              </div>
            </div>
            <div className="">
              <div className="uppercase text-primary py-2 text-xl sm:text-2xl md:text-sm">Kết nối với chúng tôi</div>
              <div className="flex space-x-8 md:space-x-5 sm:pb-7 md:pb-5 my-3 items-center">
                <div className="transition w-4 md:w-4 cursor-pointer hover:text-blue-500">
                  <IconFacebook />
                </div>
                <div className="transition w-9 md:w-9 cursor-pointer hover:text-red-500">
                  <IconYoutube />
                </div>
                <div className="transition cursor-pointer">
                  <IconZalo />
                </div>
                
              </div>
            </div>
            <div className="">
              <div className="uppercase text-primary py-2 text-xl sm:text-2xl md:text-sm">Hotline miễn phí (7h-22h)</div>
              <div className="text-base sm:py-1 md:py-2">
                <p className="mb-1 sm:mb-2">Gọi điện đặt hàng: 1900 6067</p>
                <p className="">Gọi điện tư vấn - hỗ trợ: 1900 6067</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
