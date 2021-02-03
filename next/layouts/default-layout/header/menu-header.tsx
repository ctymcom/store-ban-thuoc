import Link from "next/link";
import { useRouter } from 'next/router';

export function MenuHeader() {
  const router = useRouter()
  const menus = [
    { label: 'Sản phẩm', path: '/products' },
    { label: 'Hoạt chất', path: '/ingredients' },
    { label: 'Đặt hàng nhanh', path: '/quick-shopping' },
    { label: 'Khuyến mãi', path: '/promotions' },
    { label: 'Mã giảm giá', path: '/vouchers' },
  ];

  return (    
    <div className="bg-primary">
      <div className="main-container flex items-center justify-between">
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
        <div className="flex space-x-1 text-white">
          <span className="">HOTLINE: </span>
          <strong className="text-yellow-200"> 1900 6067 </strong> 
          <span> (miễn phí)</span>
        </div>
      </div>
    </div>
  )
}