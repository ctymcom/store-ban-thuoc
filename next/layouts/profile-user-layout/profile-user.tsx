import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineBell } from "react-icons/ai";
import { BiDonateHeart, BiListPlus } from "react-icons/bi";
import {
  HiOutlineBell,
  HiOutlineClipboardList,
  HiOutlineGift,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { ImUser } from "react-icons/im";

export function ProfileUser() {
  const router = useRouter();

  const menus = [
    {
      icon: <HiOutlineUserCircle />,
      href: "/profile",
      label: "Tài khoản của tôi",
    },
    {
      icon: <HiOutlineClipboardList />,
      href: "/profile/order-history",
      label: "Đơn hàng",
    },
    {
      icon: <HiOutlineBell />,
      href: "/profile/notification",
      label: "Thông báo",
    },
    {
      icon: <HiOutlineGift />,
      href: "/profile/reward-point",
      label: "Điểm thưởng",
    },
  ];

  return (
    <>
      <ul className="flex flex-col md:flex-row lg:flex-col md:justify-between lg:mt-4 mb-5 sm:mb-3 md:mb-0 w-full">
        {menus.map((menu, index) => (
          <li key={index} className="flex py-3 items-center border-b md:border-0 pl-5 md:pl-0">
            <i className="text-primary text-2xl pb-1 mr-2">{menu.icon}</i>
            <Link href={menu.href}>
              <a
                className={`whitespace-nowrap uppercase hover:text-primary font-semibold ${
                  router.pathname == menu.href ? " text-primary" : "text-gray-700"
                }`}
              >
                {menu.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
