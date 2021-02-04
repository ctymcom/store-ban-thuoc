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
          <div className="flex flex-col justify-start text-sm md:text-sm lg:w-4/6 px-3 sm:px-9 md:px-0">
            <div className="uppercase text-primary sm:py-1 md:py-0 md:mb-4 text-xl sm:text-2xl md:text-sm mb-2 sm:mb-0">Về khoThuocsi.vn</div>
            <p className="sm:py-1 md:pb-4 md:leading-5">
              Thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong lĩnh vực công nghệ về y tế
            </p>
            <p className="mt-3 md:mt-0  sm:mb-8 md:mb-4 md:leading-5">
              Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
              khắp Việt Nam.
            </p>
            { ShowMore ? (
                          <>
                            <p className="mt-1 sm:-mt-7 md:mt-0 md:mb-4">
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
          <div className="flex flex-col justify-start lg:w-4/6 px-3 sm:px-9 md:px-0 mt-4 sm:mt-6 md:mt-0">
            <div className="uppercase text-primary sm:py-1 md:py-0 md:mb-4 text-xl sm:text-2xl md:text-sm">Liên kết hữu ích</div>
            <div className="text-sm sm:text-md sm:py-1 md:pb-4">
              <ul>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Quy định sử dụng Website</li>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Chính sách bảo mật</li>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Chính sách bán hàng</li>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Chính sách vận chuyễn</li>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Hướng dẫn thanh toán</li>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Chính sách giải quyết khiếu nại</li>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Các câu hỏi thường gặp</li>
                <li className="sm:pb-2 md:pb-2.5 cursor-pointer">Liên hệ</li>
              </ul>
            </div>
            
          </div>
          <div className="flex flex-col justify-start text-sm sm:px-9 md:px-0 sm:mt-6 md:mt-0">
            <div className="">
              <div className="uppercase text-primary py-1 md:py-0  sm:text-2xl md:text-sm">Đăng kí nhận tin mới</div>
              <div className="sm:text-lg md:text-sm sm:py-1 md:py-2 sm:mb-5 md:mb-2 md:mt-2">Hãy đăng ký email để nhận được khuyến mãi</div>
              <div className="py-4 flex ">
                <input
                  type="text"
                  className="sm:w-full md:w-8/12 lg:w-6/12 sm:px-7 md:px-5 sm:py-4 md:py-3 sm:text-lg md:text-sm sm:border-primary sm:border-2 md:border-0 md:border-opacity-0 focus:outline-none rounded-l-full"
                  placeholder="Nhập email của bạn"
                />
                <div className="uppercase bg-primary sm:px-12 md:px-4 flex items-center cursor-pointer rounded-r-full">
                  <span className="sm:w-24 md:w-16 sm:text-xl md:text-sm">Đăng kí</span>
                </div>
              </div>
            </div>
            <div className="">
              <div className="uppercase text-primary py-2 sm:text-2xl md:text-sm">Kết nối với chúng tôi</div>
              <div className="flex sm:space-x-12 md:space-x-5 sm:pb-7 md:pb-5 my-3 items-center">
                <div className="transition sm:w-5 md:w-4 cursor-pointer hover:text-blue-500">
                  <IconFacebook />
                </div>
                <div className="transition sm:w-11 md:w-9 cursor-pointer hover:text-red-500">
                  <IconYoutube />
                </div>
                <div className="transition cursor-pointer">
                  <IconZalo />
                </div>
                
              </div>
            </div>
            <div className="">
              <div className="uppercase text-primary py-2 sm:text-2xl md:text-sm">Hotline miễn phí (7h-22h)</div>
              <div className="sm:py-1 md:py-2">
                <p className="sm:text-lg md:text-sm sm:pb-1 md:pb-0">Gọi điện đặt hàng: 1900 6067</p>
                <p className="sm:text-lg md:text-sm">Gọi điện tư vấn - hỗ trợ: 1900 6067</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
