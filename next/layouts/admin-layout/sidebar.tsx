import { SelectBox } from "../../components/shared/form/select-box";
import { IconLogout } from "../../lib/svg/icon-logout";
import Link from "next/link";
import { HiLogout } from "react-icons/hi";
import { useRouter } from "next/router";

const SIDEBAR_MENUS = [
  {
    title: "Quản trị",
    submenus: [
      {
        title: "Bài viết",
        path: "/admin/post",
      },
      {
        title: "Cấu hình",
        path: "/admin/config",
      },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter()
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 pt-12 pb-8">
          <div className="flex-grow-0 w-16">
            <div className="image-wrapper circle">
              <img src="https://i.pinimg.com/originals/71/f1/84/71f1843b56fa00a64c429a1980657dc5.jpg"/>
            </div>
          </div>
          <div className="pl-4">
            <div className="text-lg text-gray-800 font-semibold">Thu Trinh</div>
            <div className="text-gray-600">Editor</div>
          </div>
        </div>
        <div className="flex-grow">
          {SIDEBAR_MENUS.map((menu, index) => (
            <div key={index} className="w-full flex flex-col justify-start items-start py-4">
              <div className="uppercase font-semibold text-gray-500 px-8 mb-2">
                {menu.title}
              </div>
              <div className="w-full flex flex-col text-gray-700 font-semibold mb-5">
                {menu.submenus.map((submenu, index) => (
                  <Link key={submenu.path} href={submenu.path} shallow={true}>
                    <a className={`my-0.5 px-8 py-2.5 ${router.pathname.startsWith(submenu.path) ? 'text-white bg-primary hover:bg-primary-dark' : 'hover:bg-gray-100 hover:text-primary'}`}>
                      {submenu.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="btn-default is-danger mt-auto px-8 justify-start h-16 mb-4">
          <span>Đăng xuất</span>
          <i className="text-lg"><HiLogout/></i>
        </button>
      </div>
    </>
  );
}
