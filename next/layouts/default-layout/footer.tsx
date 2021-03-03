import { useState } from "react";
import { Spinner } from "../../components/shared/utilities/spinner";
import { useFooterContext } from "./providers/footer-providers";
import { IconFacebook } from "../../public/assets/icons/icon-facebook";
import { IconYoutube } from "../../public/assets/icons/icon-youtube";
import { IconZalo } from "../../public/assets/icons/icon-zalo";
import Link from "next/link";

export function Footer() {
  
  const [ShowMore, setShowMore] = useState(false);
  const { setting } = useFooterContext();
  // console.log(setting);

  return (
    <>  {
          !setting ? <Spinner/> : <>
          <footer className="mt-20 text-white" style={{ backgroundColor: '#343A40' }}>
            <div className="main-container py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-3">
              <div className="flex flex-col justify-start text-md sm:text-lg md:text-sm lg:w-4/6">
                <Link href={ setting[1].value.link }>
                  <a className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">Về khoThuocsi.vn</a>
                </Link>
                
                <p className="sm:py-1 md:pb-4 md:leading-7 text-sm sm:text-base md:text-lg">
                  { setting[1].value.content }
                </p>
                {/* <p className="mt-4 md:mt-0 sm:mb-8 md:mb-4 md:leading-7 text-sm sm:text-base md:text-lg">
                  Hiện tại là cổng điện tử cung cấp thuốc cho hơn 1.000 nhà thuốc và phòng khám trên
                  khắp Việt Nam.
                </p> */}
                {ShowMore ? (
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
              <div className="flex flex-col justify-start lg:w-5/6 mt-6 lg:mt-0">
                <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">Liên kết hữu ích</div>
                <div className="sm:py-1 md:pb-4">
                  <ul className="text-sm sm:text-base md:text-lg">
                    {
                      setting[2].value.items.map((item, index) => 
                        <li className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer">
                          <Link href={ item.link } key={index}>
                            <a>{item.text}</a>
                          </Link>
                        </li>
                      )
                    }
                  </ul>
                </div>
              </div>
              <div className="flex flex-col justify-start lg:w-full text-sm sm:mt-6 md:mt-0">
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
                    <Link href={ setting[3].value.facebook.link }>
                      <a className="transition w-3 sm:w-5 md:w-4 lg:w-5 cursor-pointer text-gray-400 hover:text-blue-500">
                        <IconFacebook />
                      </a>
                    </Link>
                    
                    <Link href={ setting[3].value.youtube.link }>
                      <a className="transition w-7 sm:w-10 md:w-8 lg:w-10 cursor-pointer text-gray-400 hover:text-red-500">
                        <IconYoutube />
                      </a>
                    </Link>
                    
                    <Link href={ setting[3].value.zalo.link }>
                      <a className="transition cursor-pointer text-gray-400 hover:text-blue-500">
                        <IconZalo />
                      </a>
                    </Link>
                    
                  </div>
                </div>
                <div className="">
                  <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">{ setting[0].value.footerText }</div>
                  <div className="text-sm sm:text-base md:text-lg sm:py-1 md:py-2 ">
                    <p className="mb-1 md:mb-1">Gọi điện đặt hàng: { setting[0].value.phone }</p>
                    <p className="">Gọi điện tư vấn - hỗ trợ: { setting[0].value.phone }</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          </>
        }      
    </>
  );
}
