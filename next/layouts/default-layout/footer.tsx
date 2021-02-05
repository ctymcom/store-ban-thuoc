import { useState } from "react";
import { IconFacebook } from "../../lib/svg/icon-facebook";
import { IconYoutube } from "../../lib/svg/icon-youtube";
import { IconZalo } from "../../lib/svg/icon-zalo";

export function Footer() {
  const [ShowMore, setShowMore] = useState(false);
  
  return ( 
    <>
      <footer className="mt-20 text-white transition">
        <div className="footer-style-jsx w-full py-8 sm:py-10 bg-gray-700 flex flex-col lg:grid lg:grid-cols-3 main-container px-7 sm:px-10 md:px-12 lg:px-32">
          <div className="flex flex-col justify-start text-md sm:text-lg md:text-sm lg:w-4/6">
            <div className="uppercase text-primary font-normal md:font-semibold text-lg sm:text-2xl md:text-2xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">Về khoThuocsi.vn</div>
            <p className="sm:py-1 md:pb-4 md:leading-7 text-sm sm:text-base md:text-lg">
              Thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế
            </p>
            <p className="mt-4 md:mt-0 sm:mb-8 md:mb-4 md:leading-7 text-sm sm:text-base md:text-lg">
              Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
              khắp Việt Nam.
            </p>
            { ShowMore ? (
                          <>
                            <p className="mt-4 sm:-mt-3.5 md:mt-0 sm:mb-9 md:mb-4 md:leading-7 text-sm sm:text-base md:text-lg">
                              Là một trong những nơi làm việc thu hút các tài năng trẻ với đam mê ứng dụng công
                              nghệ 4.0 vào nền Y Tế
                            </p>
                          </>
              ) : (
                ""
              )}
              <p
                className="text-yellow-400 cursor-pointer mt-4 sm:-mt-4 md:mt-0 text-sm sm:text-base md:text-lg"
                onClick={() => {
                  setShowMore(!ShowMore);
                }}
              >
                {ShowMore ? "Thu gọn" : "Tìm hiểu thêm"}
              </p>
          </div>
          <div className="flex flex-col justify-start lg:w-5/6 mt-6 sm:mt-6 md:mt-0">
            <div className="uppercase text-primary font-normal md:font-semibold text-lg sm:text-2xl md:text-2xl sm:py-1 md:py-0 sm:mt-0 mb-1 md:mb-2">Liên kết hữu ích</div>
            <div className="sm:py-1 md:pb-4">
              <ul className="text-sm sm:text-base md:text-lg">
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Quy định sử dụng Website</li>
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Chính sách bảo mật</li>
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Chính sách bán hàng</li>
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Chính sách vận chuyễn</li>
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Hướng dẫn thanh toán</li>
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Chính sách giải quyết khiếu nại</li>
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Các câu hỏi thường gặp</li>
                <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">Liên hệ</li>
              </ul>
            </div>
            
          </div>
          <div className="flex flex-col justify-start lg:w-full text-sm sm:mt-6 md:mt-0">
            <div className="">
              <div className="uppercase text-primary font-normal md:font-semibold text-lg sm:text-2xl md:text-2xl sm:py-1 md:py-0 mb-0 md:mb-2 mt-4 sm:mt-0 md:mt-0">Đăng kí nhận tin mới</div>
              <div className="text-sm sm:text-base md:text-lg sm:py-1 md:py-0 mt-2 sm:mt-1 md:mt-0 lg:mt-3">Hãy đăng ký email để nhận được khuyến mãi hoặc</div>
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
              <div className="uppercase text-primary font-normal md:font-semibold text-lg sm:text-2xl md:text-2xl">Kết nối với chúng tôi</div>
              <div className="flex space-x-5 sm:space-x-8 md:space-x-7 mb-4 sm:mb-7 md:mb-8 lg:mb-8 mt-4 sm:mt-7 md:mt-4 lg:mt-4 items-center">
                <div className="transition w-3 sm:w-5 md:w-4 lg:w-5 cursor-pointer">
                  <IconFacebook />
                </div>
                <div className="transition w-7 sm:w-10 md:w-8 lg:w-10 cursor-pointer">
                  <IconYoutube />
                </div>
                <div className="transition cursor-pointer">
                  <IconZalo />
                </div>
              </div>
            </div>
            <div className="">
              <div className="uppercase text-primary font-normal md:font-semibold text-lg sm:text-2xl md:text-2xl py-2 lg:py-0">Hotline miễn phí (7h-22h)</div>
              <div className="text-sm sm:text-base md:text-lg sm:py-1 md:py-2 ">
                <p className="mb-1 md:mb-1">Gọi điện đặt hàng: 1900 6067</p>
                <p className="">Gọi điện tư vấn - hỗ trợ: 1900 6067</p>
              </div>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            
            .footer-style-jsx {
              background: #343A40;
            }
          `}
        </style>
      </footer>
    </>
  );
}
