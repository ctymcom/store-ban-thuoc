import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { HiChevronDown, HiOutlineBell } from "react-icons/hi";
import { useRouter } from "next/router";
import { useAuth } from "./../../../lib/providers/auth-provider";
import { useNotificationContext } from "../../../components/index/notification/providers/notifications-provider";
import { NotFound } from "../../../components/shared/utilities/not-found";
import { Button } from "../../../components/shared/utilities/form/button";
import { useState } from "react";
import parseISO from "date-fns/parseISO";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import viLocale from "date-fns/locale/vi";

interface PropsType extends ReactProps {}

export function HeaderUser({ ...props }: PropsType) {
  const router = useRouter();
  const { user, logout, saveCurrentPath } = useAuth();
  const { listNotification } = useNotificationContext();
  const numberNotification = listNotification?.length;
  const [visible, setVisible] = useState(4);

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + visible);
  };

  const menus = [
    {
      label: "Thông tin tài khoản",
      onClick: () => router.push("/profile"),
    },
    {
      label: "Lịch sử đơn hàng",
      onClick: () => router.push("/profile/order-history"),
    },
    {
      label: "Thông báo",
      onClick: () => router.push("/profile/notification"),
    },
    {
      label: "Điểm thưởng",
      onClick: () => router.push("/profile/reward-point"),
    },
    {
      label: "Đăng xuất",
      onClick: () => logout(),
    },
  ];

  return (
    <>
      {user ? (
        <>
          <div className="relative mr-2">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="relative flex items-center px-3 mr-0 cursor-pointer hover:text-primary focus:outline-none">
                    <div className="flex-shrink-0 w-10">
                      <a className="btn-default p-0 h-10 w-14 mr-2 hover:bg-primary-light">
                        <img className="h-8" src="/assets/img/bell.png" />
                        <div className="rounded-full flex-center bg-red-500 box-shadow-white absolute right-2 top-0 text-white font-semibold h-5 min-w-5 text-xs p-1">
                          <span>{numberNotification ? numberNotification : 0}</span>
                        </div>
                      </a>
                    </div>
                  </Menu.Button>

                  <Transition
                    show={open}
                    className="z-50 "
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="max-h-72 h-scrollbar z-50	absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    >
                      {listNotification?.length > 0 && listNotification[0] !== undefined ? (
                        listNotification.slice(0, visible)?.map((notification, index) => (
                          <div
                            className="w-full pl-5 pr-2.5 py-3 hover:bg-primary-light cursor-pointer"
                            onClick={() => router.push(`${notification.link}`)}
                            key={index}
                          >
                            <p className="text-gray-700 text-14 leading-4">
                              {notification?.content}
                            </p>
                            <p className="text-gray-400 text-10">
                              {formatDistanceToNow(parseISO(notification.createdAt), {
                                addSuffix: true,
                                locale: viLocale,
                              })}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="">
                          <NotFound
                            icon={<HiOutlineBell />}
                            text="Chưa có thông báo"
                            className="text-gray-600 text-12"
                          />
                        </div>
                      )}
                      {listNotification?.length === 0 ? (
                        ""
                      ) : (
                        <Button
                          className={`"pb-2 flex mx-auto " ${
                            visible === numberNotification ? "hidden" : ""
                          } `}
                          text="Xem thêm"
                          icon={<HiChevronDown />}
                          outline={false}
                          primary={false}
                          iconPosition="end"
                          onClick={() => handleShowMorePosts()}
                        />
                      )}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>

          <div className="relative border-l border-gray-100">
            <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="relative flex items-center px-3 mr-0 cursor-pointer hover:text-primary focus:outline-none">
                    <div className="flex-shrink-0 w-10">
                      <div className="image-wrapper circle">
                        <img
                          src={user.imageLink || "/assets/img/avatar.svg"}
                          onError={(e) => {
                            (e.target as any).src = "/assets/img/avatar.svg";
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center flex-grow">
                      <div className="pl-3 font-semibold text-left leading-tight max-w-3xs text-ellipsis-2">
                        {user.nickname}
                      </div>
                      <i className="text-24 ml-auto">
                        <HiChevronDown />
                      </i>
                    </div>
                  </Menu.Button>

                  <Transition
                    show={open}
                    className="z-50"
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      static
                      className="z-50	absolute right-2 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    >
                      {menus.map((menu) => (
                        <Menu.Item key={menu.label}>
                          {({ active }) => (
                            <a
                              onClick={menu.onClick}
                              className={`${
                                active ? "bg-gray-100 text-primary" : "text-gray-700"
                              } btn-default flex justify-between w-full px-4 h-12 text-sm leading-5 text-left`}
                            >
                              {menu.label}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </>
      ) : (
        <div>
          <Link href="/login/?email=email">
            <a className="btn-default h-12 border-r text-accent" onClick={saveCurrentPath}>
              Tạo tài khoản
            </a>
          </Link>
          <Link href="/login">
            <a className="btn-default h-12" onClick={saveCurrentPath}>
              Đăng nhập
            </a>
          </Link>
        </div>
      )}
    </>
  );
}
