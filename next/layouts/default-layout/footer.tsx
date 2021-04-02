import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { IconFacebook } from "../../public/assets/icons/icon-facebook";
import { IconYoutube } from "../../public/assets/icons/icon-youtube";
import { IconZalo } from "../../public/assets/icons/icon-zalo";
import { useDefaultLayoutContext } from "./providers/default-layout-providers";
import { useAuth } from "./../../lib/providers/auth-provider";

export function Footer() {
  const [email, setEmail] = useState("");
  // const [ShowMore, setShowMore] = useState(false);
  const { hotline, footerIntro, footerMenus, socials } = useDefaultLayoutContext();
  const router = useRouter();
  const { user } = useAuth();

  return (
    <>
      {!!hotline && (
        <>
          <footer className="mt-20 text-white" style={{ backgroundColor: "#343A40" }}>
            <div className="main-container py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-3">
              <div className="flex flex-col justify-start text-md sm:text-lg md:text-sm lg:w-4/6">
                {footerIntro && (
                  <>
                    <Link href={footerIntro?.link}>
                      <a className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">
                        Về khoThuocsi.vn
                      </a>
                    </Link>
                    <p className="sm:py-1 md:pb-4 md:leading-7 text-sm sm:text-base md:text-lg">
                      {footerIntro?.content}
                    </p>
                    <p className="sm:py-1 md:pb-4 md:leading-7 text-sm sm:text-base md:text-lg">
                      {footerIntro?.more}
                    </p>
                  </>
                )}
              </div>
              <div className="flex flex-col justify-start lg:w-5/6 mt-6 lg:mt-0">
                <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">
                  Liên kết hữu ích
                </div>
                <div className="sm:py-1 md:pb-4">
                  {footerMenus && (
                    <ul className="text-sm sm:text-base md:text-lg">
                      {footerMenus.map((menu, index) => (
                        <li
                          key={index}
                          className="pb-2 sm:pb-2.5 md:pb-3 lg:pb-2 cursor-pointer hover:underline"
                        >
                          <Link href={menu.link} key={index}>
                            <a>{menu.text}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-start lg:w-full text-sm sm:mt-6 md:mt-0">
                {user === null && (
                  <div className="">
                    <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">
                      Đăng kí nhận tin mới
                    </div>
                    <div className="text-sm sm:text-base md:text-lg sm:py-1 md:py-0 mt-2 sm:mt-1 md:mt-0 lg:mt-3">
                      Hãy đăng ký email để nhận được khuyến mãi
                    </div>
                    <form
                      className="py-6 sm:py-10 md:py-10 lg:py-8 flex w-full sm:w-8/12 md:w-11/12 lg:w-full"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <input
                        type="text"
                        value={email}
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="text-gray-800 w-full h-12 md:w-7/12 lg:w-10/12 px-4 sm:px-6 md:px-5 text-lg sm:text-base md:text-sm lg:text-base focus:outline-none rounded-l-full"
                        placeholder="Nhập email của bạn"
                      />
                      <button
                        className="btn-primary h-12 uppercase text-sm md:text-base px-6 lg:px-8 whitespace-nowrap rounded-l-none rounded-r-full"
                        onClick={() => {
                          if (email) {
                            router.push({ pathname: "/login", query: { email } });
                          }
                        }}
                      >
                        Đăng kí
                      </button>
                    </form>
                  </div>
                )}
                <div className="">
                  <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">
                    Kết nối với chúng tôi
                  </div>
                  <div className="flex space-x-5 sm:space-x-8 md:space-x-7 mb-4 sm:mb-7 md:mb-8 lg:mb-8 mt-4 sm:mt-7 md:mt-4 lg:mt-4 items-center">
                    {socials && (
                      <>
                        {socials.facebook && socials.facebook.visible && (
                          <Link href={socials.facebook.link}>
                            <a
                              className="transition w-5 sm:w-5 md:w-4 lg:w-5 cursor-pointer text-gray-400 hover:text-blue-500"
                              target="_blank"
                            >
                              <IconFacebook />
                            </a>
                          </Link>
                        )}
                        {socials.youtube && socials.youtube.visible && (
                          <Link href={socials.youtube.link}>
                            <a
                              className="transition w-8 sm:w-8 md:w-9 lg:w-10 cursor-pointer text-gray-400 hover:text-red-500"
                              target="_blank"
                            >
                              <IconYoutube />
                            </a>
                          </Link>
                        )}
                        {socials.zalo && socials.zalo.visible && (
                          <Link href={socials.zalo.link}>
                            <a
                              className="transition w-3 sm:w-5 md:w-4 lg:w-5 cursor-pointer text-gray-400 hover:text-blue-500"
                              target="_blank"
                            >
                              <IconZalo />
                            </a>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="">
                  <div className="uppercase text-primary font-semibold text-lg sm:text-xl sm:py-1 md:py-0 mb-2 sm:mb-0 md:mb-2">
                    {hotline?.headerText}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg sm:py-1 md:py-2 cursor-pointer ">
                    <p className="mb-1 md:mb-1 hover:underline hover:text-primary">
                      Gọi điện đặt hàng: {hotline?.phone}
                    </p>
                    <p className="hover:underline hover:text-primary">
                      Gọi điện tư vấn - hỗ trợ: {hotline?.phone}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-center col-span-3">{footerIntro?.copyright}</p>
            </div>
          </footer>
        </>
      )}
    </>
  );
}
