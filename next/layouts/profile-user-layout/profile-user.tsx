import Link from "next/link";
import { useRouter } from "next/router";
import { AiOutlineBell } from "react-icons/ai";
import { BiDonateHeart, BiListPlus } from "react-icons/bi";
import { ImUser } from "react-icons/im";

export function ProfileUser() {
  const router = useRouter();

  return (
    <>
      <ul className="flex flex-col md:flex-row lg:flex-col md:justify-between lg:mt-4 mb-5 sm:mb-3 md:mb-0 w-full">
        <li className="flex md:mb-5 xl:mb-7 items-center py-2.5 md:py-0 border-t border-b md:border-0 pl-5 md:pl-0">
          <ImUser className="text-primary border-2 border-primary rounded-full text-md sm:text-lg md:text-2xl p-0.5 mr-2" />
          <Link href="/profile" shallow={true}>
            <a
              className={`" whitespace-nowrap uppercase text-sm md:text-base hover:text-primary font-extralight " 
                                ${router.pathname == "/profile" ? " text-primary" : ""}`}
            >
              Tài khoản của tôi
            </a>
          </Link>
        </li>
        <li className="flex md:mb-5 xl:mb-7 items-center py-2.5 md:py-0 border-b md:border-b-0 pl-5 md:pl-0">
          <BiListPlus className="text-primary border-2 border-primary rounded text-md sm:text-lg md:text-2xl mr-2" />
          <Link href="/profile/order-history" shallow={true}>
            <a
              className={`"  uppercase text-sm md:text-base hover:text-primary font-extralight "
                                ${
                                  router.pathname == "/profile/order-history" ||
                                  router.pathname == "/profile/order-details"
                                    ? " text-primary"
                                    : ""
                                }`}
            >
              Đơn hàng
            </a>
          </Link>
        </li>
        <li className="flex md:mb-5 xl:mb-7 items-center py-2.5 md:py-0 border-b md:border-b-0 pl-5 md:pl-0">
          <AiOutlineBell className="text-primary text-md sm:text-lg md:text-2xl mr-2" />
          <Link href="/profile/notification" shallow={true}>
            <a
              className={`"  uppercase text-sm md:text-base hover:text-primary font-extralight "
                                ${
                                  router.pathname == "/profile/notification" ? " text-primary" : ""
                                }`}
            >
              Thông báo
            </a>
          </Link>
        </li>
        <li className="flex md:mb-5 xl:mb-7 items-center py-2.5 md:py-0 border-b md:border-b-0 pl-5 md:pl-0">
          <BiDonateHeart className="text-primary text-md sm:text-lg md:text-2xl mr-2" />
          <Link href="/profile/reward-point" shallow={true}>
            <a
              className={`"  uppercase text-sm md:text-base hover:text-primary font-extralight "
                                ${
                                  router.pathname == "/profile/reward-point" ? " text-primary" : ""
                                }`}
            >
              Điểm thưởng
            </a>
          </Link>
        </li>
      </ul>
    </>
  );
}
