import { Transition } from '@headlessui/react';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { HiChevronRight, HiOutlineX } from 'react-icons/hi';
import { HeaderUser } from "./header-user";
interface PropsType extends ReactProps {

  user: any
  setUser: Function  
  menuOpened: boolean
  setMenuOpened: Function 
}
export function MenuHeader(props: PropsType) {
  const [showHotline, setShowHotline] = useState(false);
  const router = useRouter()
  const menus = [
    { label: 'Sản phẩm', path: '/products' },
    { label: 'Hoạt chất', path: '/ingredients' },
    { label: 'Đặt hàng nhanh', path: '/quick-shopping' },
    { label: 'Khuyến mãi', path: '/promotions' },
  ];
  
  useEffect(() => {
    props.setMenuOpened(false)
  }, [router.pathname]);

  return <>
    {
      props.menuOpened && 
      <Transition
        show={props.menuOpened}
        enter="transition-opacity duration-150"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-75"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed w-screen h-screen z-50 top-0 left-0">
          <div className="absolute bg-black w-full h-full opacity-40" onClick={() => props.setMenuOpened(false)}></div>
          <div className="relative w-8/12 h-full bg-white shadow-md min-w-2xs flex flex-col">
            <div className="h-16 bg-primary flex items-center justify-between">
              <span className="text-white text-lg font-bold px-6">Menu</span>
              <button 
                className="btn-default px-0 w-10 h-10 mr-2 text-gray-100 hover:text-white hover:bg-primary-dark text-24"
                onClick={() => props.setMenuOpened(false)}
              >
                <i><HiOutlineX/></i>
              </button>
            </div>
            <div className="flex w-full py-4 border-b border-gray-100">
              <HeaderUser user={props.user} setUser={props.setUser}/>
            </div>
            {menus.map((menu, index) => (
              <Link href={menu.path} key={index}>
                <a className={`px-4 py-3 flex justify-between font-medium text-16 text-gray-600 hover:text-primary hover:bg-gray-50 border-b border-gray-100
                ${router.pathname == menu.path ? 'bg-primary-light text-primary font-semibold' : ''}`}>
                  <span>{menu.label}</span>
                  <i className="text-20"><HiChevronRight/></i>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </Transition>
    }
    <div className="bg-primary hidden md:block">
      <div className="main-container flex justify-between items-stretch">
        <ul className="flex">
          {menus.map((menu, index) => (
            <Link href={menu.path} key={index}>
              <a className={`p-4 text-gray-50 font-medium text-16 hover:bg-primary-dark
              ${router.pathname == menu.path ? 'bg-primary-dark font-semibold' : ''}`}>
                {menu.label}
              </a>
            </Link>
          ))}
        </ul>
        <div className="flex items-center space-x-1 text-white relative" 
          onMouseEnter={() => setShowHotline(true)}
          onMouseLeave={() => setShowHotline(false)}
        >
          <span className="">HOTLINE: </span>
          <strong className="text-yellow-200"> 1900 6067 </strong> 
          <span> (miễn phí)</span>
          {
            showHotline && <div className="absolute emerge shadow-lg top-full -left-8 bg-white z-10 text-gray-700 p-4 px-6 rounded whitespace-nowrap font-semibold">
              <div>Tư vấn bán hàng: 1900 6067</div>
              <div>Góp ý dịch vụ: 1900 6067</div>
              <div>Lắng nghe khiếu nại: 1900 6067</div>
            </div>
          }
        </div>
      </div>
    </div>
  </>
}