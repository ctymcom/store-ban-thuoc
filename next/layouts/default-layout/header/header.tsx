import { useState } from "react";
import { BreadcrumbItem } from "../../admin-layout";
import { MainHeader } from './main-header';
import { MenuHeader } from './menu-header';
import { TopHeader } from "./top-header";
type HeaderProps = {
  [x: string]: any;
  breadcrumbs?: BreadcrumbItem[];
  activeMenu?: number;
};
export function Header({ activeMenu = 0, breadcrumbs = [], ...props }: HeaderProps) {

  const [menuOpened, setMenuOpened] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <>
      <div className="w-full">
        <TopHeader />
        <MainHeader user={user} setUser={setUser} setMenuOpened={setMenuOpened}/>
        <MenuHeader user={user} setUser={setUser} menuOpened={menuOpened} setMenuOpened={setMenuOpened}/>
      </div>

      {/* do header có nhiều thay đổi so với desktop nên em tạo thêm 1 cái mới luôn ạ */}

      {/* <div className="lg:hidden w-full flex justify-between  items-center px-4 py-4">
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
      
      {breadcrumbs.length != 0 && (
        <div className="main-container flex items-center mt-3 py-2">
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
      )} */}
    </>
  );
}