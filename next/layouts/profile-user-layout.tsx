import Link from "next/link";
import { ProductList } from "../components/shared/product/product-list";
import BreadCrumbs from "../components/shared/utilities/breadcrumbs/breadcrumbs";
import { ProfileUser } from "./profile-user-layout/profile-user";

interface PropsType extends ReactProps {
  breadcrumb?: string;
}

export function ProfileUserLayout({ breadcrumb = "", ...props }: PropsType) {
  const breadcrumbObject = {
    "account-user": "Tài khoản của tôi",
    order: "Đơn hàng",
    notification: "Thông báo",
    "reward-point": "Điểm thưởng",
    "order-details": "Chi tiết đơn hàng",
  };

  const breadcrumbs = [
    {
      href: "/",
      label: "Trang chủ",
    },
    {
      label: breadcrumbObject[breadcrumb],
    },
  ];

  return (
    <>
      <div className="main-container h-auto xs:pl-3 sm:pl-4 md:pl-4 lg:pl-0 xs:pr-3 sm:pr-4 md:pr-4 lg:pr-0 py-8 md:py-12">
        <div className="w-full">
          <div className="pb-2">
            <BreadCrumbs breadcrumbs={breadcrumbs} />
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-between lg:space-x-20 mt-0 md:mt-6 mb-0">
            <div className="w-full lg:w-96">
              <ProfileUser />
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
}
