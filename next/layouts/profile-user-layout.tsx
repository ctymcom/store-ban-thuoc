import { useRouter } from "next/router";
import { useEffect } from "react";
import BreadCrumbs from "../components/shared/utilities/breadcrumbs/breadcrumbs";
import { Spinner } from "../components/shared/utilities/spinner";
import { useAuth } from "../lib/providers/auth-provider";
import { ProfileUser } from "./profile-user-layout/profile-user";
import useScreen from "./../lib/hooks/useScreen";

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
  const router = useRouter();

  const { user, saveCurrentPath } = useAuth();
  useEffect(() => {
    if (user === null) {
      saveCurrentPath();
      router.replace("/login");
    }
  }, [user]);

  const screenLg = useScreen("lg");

  return (
    <>
      {!user ? (
        <Spinner />
      ) : (
        <div className="main-container">
          <div className="pt-8 pb-2">
            <BreadCrumbs breadcrumbs={breadcrumbs} />
          </div>
          <div className="w-full flex flex-col lg:flex-row justify-between mt-0 md:mt-6 mb-0">
            <div className="flex-grow-0 flex-shrink-0 w-full lg:w-60">
              <ProfileUser />
            </div>
            <div
              className="flex-grow"
              style={{ maxWidth: screenLg ? "calc(100% - 15rem)" : "100%" }}
            >
              {props.children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
