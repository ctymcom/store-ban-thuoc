import { useState } from "react";
import { IconFacebook } from "../../lib/svg/icon-facebook";
import { IconYoutube } from "../../lib/svg/icon-youtube";

export function Footer() {
  const [ShowMore, setShowMore] = useState(false);
  return (
    <>
      <footer className=" mt-20 text-white transition">
        <div className=" w-full py-8 bg-gray-700  flex flex-col space-y-4  lg:grid lg:grid-cols-3 container-1">
          <div className="flex flex-col justify-start text-sm lg:w-3/6 ">
            <div className="uppercase text-green-500 py-2">Về khoThuocsi.vn</div>
            <p className="py-4">
              Thuocsi.vn được thành lập từ năm 2018, là một trong những startup thành công trong
              lĩnh vực công nghệ về y tế
            </p>
            {ShowMore ? (
              <>
                <p className="py-4">
                  Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
                  khắp Việt Nam.
                </p>
                <p className="py-4">
                  Là một trong những nơi làm việc thu hút các tài năng trẻ với đam mê ứng dụng công
                  nghệ 4.0 vào nền Y Tế
                </p>
              </>
            ) : (
                ""
              )}
            <p
              className="text-yellow-400 cursor-pointer"
              onClick={() => {
                setShowMore(!ShowMore);
              }}
            >
              {ShowMore ? "Thu gọn" : "Tìm hiểu thêm"}
            </p>
          </div>
          <div className="flex flex-col justify-start text-sm lg:w-3/6 ">
            <div className="uppercase text-green-500 py-2">Liên kết hữu ích</div>
            <div className="text-sm py-2">
              <ul>
                <li className="pb-2 cursor-pointer">Các câu hỏi thường gặp</li>
                <li className="pb-2 cursor-pointer">Tìm cửa hàng gần bạn</li>
                <li className="pb-2 cursor-pointer">Chính sách giao hàng</li>
                <li className="pb-2 cursor-pointer">Chính sách đổi trả</li>
              </ul>
            </div>
            <div className="lg:w-6/6 px-4 py-3 mt-5 bg-green-500  text-center rounded-full cursor-pointer ">
              Trở thành nhà cung cấp
            </div>
          </div>
          <div className="flex flex-col justify-start text-sm">
            <div className="">
              <div className="uppercase text-green-500 py-1">Đăng kí nhận tin mới</div>
              <div className="text-sm pb-1">Hãy đăng kí email để nhận được khuyến mãi</div>
              <div className="py-4 flex ">
                <input
                  type="text"
                  className="w-8/12 lg:w-6/12 px-4 py-3 focus:outline-none rounded-l-full"
                  placeholder="Nhập email của bạn"
                />
                <div className="uppercase  bg-green-500 px-4 flex items-center cursor-pointer rounded-r-full">
                  Đăng kí
                </div>
              </div>
            </div>
            <div className="">
              <div className="uppercase text-green-500 py-2">Kết nối với chúng tôi</div>
              <div className="flex space-x-5 pb-5">
                <div className="transition w-4 cursor-pointer hover:text-blue-500">
                  <IconFacebook />
                </div>
                <div className="transition w-10 cursor-pointer hover:text-red-500">
                  <IconYoutube />
                </div>
              </div>
            </div>
            <div className="">
              <div className="uppercase text-green-500 py-2">Hotline miễn phí (7h-22h)</div>
              <div className="py-2">
                <p className="">Gọi điện đặt hàng: 1900 6067</p>
                <p className="">Gọi điện tư vấn - hỗ trợ: 1900 6067</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
