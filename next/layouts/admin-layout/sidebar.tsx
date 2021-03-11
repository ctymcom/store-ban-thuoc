import Link from "next/link";
import { useRouter } from "next/router";
import { HiLogout } from "react-icons/hi";
import { useAuth } from "../../lib/providers/auth-provider";
import { USER_ROLES } from "../../lib/repo/arito-user.repo";

const SIDEBAR_MENUS = [
  {
    title: "Quản trị",
    submenus: [
      {
        title: "Bài viết",
        path: "/admin/post",
      },
      {
        title: "Cảm nhận",
        path: "/admin/feedback",
      },
      {
        title: "Cấu hình",
        path: "/admin/settings",
      },
    ],
  },
];

export default function Sidebar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const userRole = USER_ROLES.find((x) => x.value == user.role)?.label;
  return (
    <>
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 pt-12 pb-8">
          <div className="flex-grow-0 w-16">
            <div className="image-wrapper circle">
              <img src="/assets/img/avatar.svg" />
            </div>
          </div>
          <div className="pl-4">
            <div className="text-16 text-gray-700 font-semibold leading-tight">{user.nickname}</div>
            <div className="text-gray-600">{userRole}</div>
          </div>
        </div>
        <div className="flex-grow">
          {SIDEBAR_MENUS.map((menu, index) => (
            <div key={index} className="w-full flex flex-col justify-start items-start py-4">
              <div className="uppercase font-semibold text-gray-500 px-8 mb-2">{menu.title}</div>
              <div className="w-full flex flex-col text-gray-700 font-semibold mb-5">
                {menu.submenus.map((submenu, index) => (
                  <Link key={submenu.path} href={submenu.path} shallow={true}>
                    <a
                      className={`my-0.5 px-8 py-2.5 ${
                        router.pathname.startsWith(submenu.path)
                          ? "text-white bg-primary hover:bg-primary-dark"
                          : "hover:bg-gray-100 hover:text-primary"
                      }`}
                    >
                      {submenu.title}
                    </a>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          className="btn-default is-danger mt-auto px-8 justify-start h-16 mb-4"
          onClick={logout}
        >
          <span>Đăng xuất</span>
          <i className="text-lg">
            <HiLogout />
          </i>
        </button>
      </div>
    </>
  );
}
