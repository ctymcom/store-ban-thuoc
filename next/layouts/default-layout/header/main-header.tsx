import { IconSearch } from './../../../lib/svg/icon-search';
import { IconCart } from './../../../lib/svg/icon-cart';
import Image from 'next/image'
import Link from 'next/link';
export function MainHeader() {  
  return (    
    <div className="main-container py-2 flex justify-between">
      <div className="flex items-start">
        <Link href="/">
          <a className="logo">
            <Image src="/assets/img/logo.png" width={'auto'} height={72} objectFit="contain"></Image>
          </a>
        </Link>
        <style jsx>{`
          .logo {
            width: 120px;
          }
        `}</style>
      </div>
      <div className="search col-span-2 flex items-center w-full max-w-md">
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
      <div className="flex items-center justify-end text-gray-500">
        <Link href="/profile/order-history">
          <a className=" px-3 cursor-pointer">Đăng nhập</a>
        </Link>
        <Link href="/cart">
          <a className="border-l border-gray-300 px-3 flex items-center cursor-pointer">
            <div className="w-8">
              <IconCart />
            </div>
          </a>
        </Link>
      </div>
    </div>
  )
}