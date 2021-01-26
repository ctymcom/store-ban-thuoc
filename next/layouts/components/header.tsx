import { useState } from "react";
import { IconCart } from "../../lib/svg/icon-cart";
import Link from "next/link";
import { IconSearch } from "../../lib/svg/icon-search";
import { Logo } from "../../lib/svg/logo";
import { BreadcrumbItem } from "../dashboard-layout";
import { IconArrowRight } from "../../lib/svg/icon-arrow-right";
import { IconMenu } from "../../lib/svg/icon-menu";
import { IconClose } from "../../lib/svg/icon-close";
import { Transition } from "@headlessui/react";
type HeaderProps = {
  [x: string]: any;
  breadcrumbs?: BreadcrumbItem[];
  activeMenu?: number;
};
export function Header({ activeMenu = 0, breadcrumbs, ...props }: HeaderProps) {
  const topMenu = ["Tin tức", "Tuyển dụng", "Trở thành nhà bán thuốc"];
  const mainMenu = ["Sản phẩm", "Hoạt chất", "Khuyến mãi", "Tin tức sức khỏe"];
  const NavMenu = [
    "Sản phẩm",
    "Hoạt chất",
    "Khuyến mãi",
    "Tin tức sức khỏe",
    "Tuyển dụng",
    "Tài khoản",
  ];
  const [ActiveMenu, setActiveMenu] = useState(activeMenu);
  const [showNavMenu, setshowNavMenu] = useState(false);
  return (
    <>
      <div className="w-full hidden lg:block">
        <div className="hidden container-1 lg:flex items-center py-2 bg-gray-200 justify-end text-xs">
          {topMenu.map((m, index) => (
            <p key={index} className="text text-gray-400 cursor-pointer ml-5">
              {m}
            </p>
          ))}
        </div>
        <div className="container-1 py-6 grid grid-cols-4">
          <div className="hidden"></div>
          <div className="w-16 ">
            <Logo />
          </div>
          <div className="hidden search col-span-2 lg:flex items-center w-full">
            <div className="relative flex items-center w-full">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="py-2 px-12  w-full bg-white ring-gray-300 ring-1 text-sm text-gray-500 rounded-full focus:outline-none focus:ring-gray-400 "
              />
              <div className="absolute icon w-4 text-gray-400 z-50 left-5">
                <IconSearch />
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-end text-gray-500">
            <div className=" px-3 cursor-pointer">Đăng nhập</div>
            <div className="border-l border-gray-300 px-3 flex items-center cursor-pointer">
              <div className="pr-2">Giỏ hàng</div>
              <div className="w-8">
                <IconCart />
              </div>
            </div>
          </div>
        </div>
        <div className="container-1 bg-primary-400 text-white flex items-center justify-between">
          <ul className="flex text-sm">
            {mainMenu.map((m, index) => (
              <li
                key={index}
                className={
                  "cursor-pointer py-2 px-6 hover:bg-primary-500 " +
                  (ActiveMenu == index ? "bg-primary-500" : "")
                }
              >
                {m}
              </li>
            ))}
          </ul>
          <div className="text-sm flex space-x-1">
            <p className="">HOTLINE: </p>
            <b className="text-yellow-200"> 1900 6067 </b> (miễn phí)
          </div>
        </div>
      </div>

      {/* do header có nhiều thay đổi so với desktop nên em tạo thêm 1 cái mới luôn ạ */}

      <div className="lg:hidden w-full flex justify-between  items-center px-4 py-4">
        <div className="text-primary-500">
          <div
            className="w-6 "
            onClick={() => {
              setshowNavMenu(true);
            }}
          >
            <IconMenu />
          </div>
        </div>
        <div className="">
          <div className="w-16 ">
            <Logo />
          </div>
        </div>
        <div className="flex space-x-4 text-primary-500">
          <div className="w-6 ">
            <IconSearch />
          </div>
          <div className="w-6 ">
            <IconCart />
          </div>
        </div>
      </div>
      {/* <Transition
        className="transition-all duration-700"
        show={showNavMenu}
        enterFrom="translate-x-4"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
                > */}
      <div
        className={
          "transition-opacity duration-1000 min-h-screen h-full w-full fixed top-0 z-50 bg-black bg-opacity-25 flex " +
          (showNavMenu ? "opacity-100" : "invisible")
        }
      >
        <div
          className={
            "w-4/6 bg-white transition-all duration-1000 transform " +
            (showNavMenu ? "translate-x-0" : "-translate-x-full")
          }
        >
          <div className="py-5 px-5 h-32 bg-primary-500 text-white flex items-center relative">
            <p className="text-lg">Đăng nhập</p>
            <div
              className="w-4 absolute top-5 right-5"
              onClick={() => {
                setshowNavMenu(false);
              }}
            >
              <IconClose />
            </div>
          </div>
          <div className="flex flex-col justify-between h-5/6">
            <div className="">
              <ul className="inline">
                {NavMenu.map((item, index) => (
                  <li
                    key={index}
                    className={
                      "cursor-pointer py-4 px-6 border-b-2 border-gray-100 hover:bg-primary-500 flex justify-between"
                    }
                  >
                    <p className="">{item}</p>
                    <div className="w-5 text-gray-200">
                      <IconArrowRight />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="p-5">
                <div className="px-4 py-3 text-center rounded-full text-sm text-white bg-primary-500">
                  Trở thành nhà cung cấp
                </div>
              </div>
            </div>
            <div className="p-5">
              <h2 className="uppercase text-primary-500">hotline miễn phí (7h-22h)</h2>
              <p className="">Gọi đặt hàng: 1800 6821</p>
              <p className="">Gọi tư vấn - hỗ trợ: 1800 2001</p>
            </div>
          </div>
        </div>
        <div className="w-2/6 " onClick={() => {
          setshowNavMenu(false);
        }}></div>
      </div>
      {/* </Transition> */}
      {breadcrumbs.length != 0 && (
        <div className="container-1 flex items-center mt-3 py-2">
          {breadcrumbs
            .map((item, index, array) => {
              const actived = index == array.length - 1;
              return (
                <div
                  className={(actived ? "text-green-500 font-semibold" : "text-gray-400") + " "}
                  key={index}
                >
                  <Link href={item.path}>{item.title}</Link>
                </div>
              );
            })
            .reduce((accu, elem, index): any => {
              return accu === null
                ? [elem]
                : [
                  ...accu,
                  <IconArrowRight key={index * 2 + 1} className="w-4 h-4 text-gray-400" />,
                  elem,
                ];
            }, null as any)}
        </div>
      )}
    </>
  );
}