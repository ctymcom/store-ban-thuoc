import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineShoppingCart, HiOutlineX } from "react-icons/hi";
import { HeaderUser } from "./header-user";
interface PropsType extends ReactProps {
  user: any
  setUser: Function
  setMenuOpened: Function 
}
export function MainHeader({ user, setUser, ...props}: PropsType) {
  const [searchText, setSearchText] = useState("");

  return (
    <div className="bg-white shadow md:shadow-none">
      <div className="main-container h-16 md:h-20 flex items-center justify-between">
        <button className="btn-default text-28 h-10 w-12 md:hidden" onClick={() => props.setMenuOpened(true)}>
          <i><HiOutlineMenu/></i>
        </button>
        <button className="flex items-start">
          <Link href="/">
            <a className="w-20 pr-2 md:w-24">
              <img 
                src="/assets/img/logo.png"
                className="w-full h-full object-contain"
              />
            </a>              
          </Link>
        </button>
        <div className="relative hidden md:flex items-center md:min-w-xs max-w-96">
          <input
            type="text"
            placeholder="Tìm kiếm"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="h-12 px-12 w-full text-gray-800 border border-gray-400 rounded-full 
          focus:ring-gray-400"
          />
          <div className="absolute left-5 text-gray-700">
            <HiOutlineSearch />
          </div>
          {searchText && (
            <button className="btn-default is-danger h-12 w-10 absolute right-1" onClick={() => setSearchText('')}>
              <i>
                <HiOutlineX />
              </i>
            </button>
          )}
        </div>
        <div className="flex items-center justify-end text-gray-500">
          <button className="btn-default p-0 h-10 w-16 md:hidden">
            <i className="text-24">
              <HiOutlineSearch />
            </i>
          </button>
          <div className="hidden md:flex">
            <HeaderUser/>
          </div>
          {/* <Link href="/profile/order-history">
            <a className=" px-3 cursor-pointer">Đăng nhập</a>
          </Link> */}
          <Link href="/cart">
            <a className="border-l btn-default p-0 h-10 w-16">
              <i className="text-24">
                <HiOutlineShoppingCart />
              </i>
              <div className="rounded-full flex-center bg-primary box-shadow-white absolute right-2 top-0 text-white font-semibold h-5 min-w-5 text-xs p-1">
                <span>5</span>                
              </div>
            </a>
          </Link>   
        </div>
      </div>
    </div>
  );
}
