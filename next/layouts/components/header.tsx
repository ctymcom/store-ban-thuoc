import { useState } from "react";
import { IconCart } from "../../lib/svg/icon-cart";

import { IconSearch } from "../../lib/svg/icon-search";
import { Logo } from "../../lib/svg/logo";
type HeaderProps = {
  [x: string]: any;
  activeMenu?: number;
};
export function Header({ activeMenu = 0, ...props }: HeaderProps) {
  const topMenu = ["Tin tức", "Tuyển dụng", "Trở thành nhà bán thuốc"];
  const mainMenu = ["Sản phẩm", "Hoạt chất", "Khuyến mãi", "Tin tức sức khỏe"];
  const [ActiveMenu, setActiveMenu] = useState(activeMenu);
  return (
    <>
      <div className="w-full">
        <div className="container-1 flex items-center py-2 bg-gray-200 justify-center text-xs">
          {topMenu.map((m, index) => (
            <p key={index} className="text text-gray-400 cursor-pointer ml-5">
              {m}
            </p>
          ))}
        </div>
        <div className="container-1 py-6 grid grid-cols-3">
          <div className="w-16 ">
            <Logo />
          </div>
          <div className="search col-span-2 flex items-center w-full">
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
          <div className="col-span-2 py-2 flex items-center justify-start text-gray-500">
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
          <ul className="flex text-sm md:text-xs">
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
    </>
  );
}
