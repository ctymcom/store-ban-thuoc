import Link from "next/link";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineSearch, HiOutlineShoppingCart, HiOutlineX } from "react-icons/hi";
import { useCart } from "../../../lib/providers/cart-provider";
import { HeaderUser } from "./header-user";
import { Form } from "./../../../components/shared/utilities/form/form";
import { useRouter } from "next/router";
interface PropsType extends ReactProps {
  setMenuOpened: Function;
}
export function MainHeader(props: PropsType) {
  const [searchText, setSearchText] = useState("");
  const { cartProductCount, cartProductTotal } = useCart();

  const router = useRouter();
  const searchTerm = async () => {
    if (searchText) {
      await router.push({ pathname: "/quick-shopping", query: { search: searchText } });
      setSearchText("");
    }
  };

  return (
    <div className="bg-white shadow md:shadow-none">
      <div className="main-container h-16 md:h-20 flex items-center">
        <button
          className="btn-default text-28 h-10 w-12 md:hidden"
          onClick={() => props.setMenuOpened(true)}
        >
          <i>
            <HiOutlineMenu />
          </i>
        </button>
        <button className="btn-default h-10 w-12 md:hidden opacity-0"></button>
        <button className="flex items-start ml-auto md:ml-0">
          <Link href="/">
            <a className="w-20 pr-2 md:w-24">
              <img src="/assets/img/logo.png" className="w-full h-full object-contain" />
            </a>
          </Link>
        </button>
        <Form
          className="relative hidden md:flex items-center lg:min-w-xs max-w-96 ml-auto"
          onSubmit={searchTerm}
        >
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
            <button
              type="button"
              className="btn-default hover-danger h-12 w-10 absolute right-1"
              onClick={() => setSearchText("")}
            >
              <i>
                <HiOutlineX />
              </i>
            </button>
          )}
        </Form>
        <div className="flex items-center justify-end text-gray-500 ml-auto">
          <Link href="/quick-shopping">
            <a className="btn-default p-0 h-10 w-12 md:w-16 md:hidden">
              <i className="text-24">
                <HiOutlineSearch />
              </i>
            </a>
          </Link>
          <div className="hidden md:flex">
            <HeaderUser />
          </div>
          {/* <Link href="/profile/order-history">
            <a className=" px-3 cursor-pointer">Đăng nhập</a>
          </Link> */}
          <Link href="/cart">
            <a className="border-l btn-default rounded-none p-0 h-10 w-12 md:w-16">
              <i className="text-24">
                <HiOutlineShoppingCart />
              </i>
              {!!cartProductTotal && (
                <div className="rounded-full flex-center bg-primary box-shadow-white absolute right-0 md:right-2 top-0 text-white font-semibold h-5 min-w-5 text-xs p-1">
                  <span>{cartProductTotal}</span>
                </div>
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
