import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiChevronDown, HiOutlineBell, HiOutlineSearch, HiOutlineShoppingCart, HiOutlineX } from "react-icons/hi";
export function MainHeader() {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState(null);

  const handleSetUser = () => {
    if (user) {
      setUser(null)
    } else {
      setUser({
        avatar: "https://i.pinimg.com/originals/71/f1/84/71f1843b56fa00a64c429a1980657dc5.jpg",
        name: "Minh Đức Uy"
      })
    }
  }

  return (
    <>
      <div className="main-container py-2 flex justify-between">
        <div className="flex items-start">
          <Link href="/">
            <a className="logo">
              <Image
                src="/assets/img/logo.png"
                width={"auto"}
                height={72}
                objectFit="contain"
              ></Image>
            </a>              
          </Link>
            <style jsx>{`
              .logo {
                width: 120px;
              }
            `}</style>
        </div>
          <div className="relative flex items-center w-96">
            <input
              type="text"
              placeholder="Tìm kiếm"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="py-3 px-12 w-full text-gray-800 border border-gray-400 rounded-full 
            focus:ring-gray-400"
            />
            <div className="absolute left-5 text-gray-700">
              <HiOutlineSearch />
            </div>
            {searchText && (
              <button className="btn-default is-danger is-icon absolute right-3" onClick={() => setSearchText('')}>
                <i>
                  <HiOutlineX />
                </i>
              </button>
            )}
          </div>
        <div className="flex items-center justify-end text-gray-500">
          {
            !user && 
            <button className="btn-default h-14" onClick={() => handleSetUser()}>
              Đăng nhập
            </button>
          }
          {
            user && <>       
              <Link href="/profile/order-history">
                <a className="border-r btn-default p-0 h-10 w-16">
                  <i className="text-24">
                    <HiOutlineBell />
                  </i>
                  <div className="rounded-full flex-center bg-primary box-shadow-white absolute right-2 top-0 text-white font-semibold h-5 min-w-5 text-xs p-1">
                    <span>76</span>                
                  </div>
                </a>
              </Link> 
              <div className="flex items-center px-4 cursor-pointer hover:text-primary" onClick={() => handleSetUser()}>
                <div className="flex-shrink-0 w-10">
                  <div className="image-wrapper round">
                    <img src={user.avatar}/>
                  </div>
                </div>
                <div className="pl-3 pr-2 font-semibold">{user.name}</div>
                <i className="text-24">
                  <HiChevronDown/>
                </i>
              </div>
            </>
          }
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
    </>
  );
}
