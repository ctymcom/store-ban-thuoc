import Link from "next/link";
import { useRouter } from 'next/router';
import { useState } from "react";

export function MenuHeader() {
  const [showHotline, setShowHotline] = useState(false);
  const router = useRouter()
  const menus = [
    { label: 'Sản phẩm', path: '/products' },
    { label: 'Hoạt chất', path: '/ingredients' },
    { label: 'Đặt hàng nhanh', path: '/quick-shopping' },
    { label: 'Khuyến mãi', path: '/promotions' },
  ];

  return (    
    <div className="bg-primary">
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
  )
}