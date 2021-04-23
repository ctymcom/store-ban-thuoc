import formatDistanceToNow from "date-fns/formatDistanceToNow";
import viLocale from "date-fns/locale/vi";
import Link from "next/link";
import { useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { useNotificationContext } from "../../../components/index/notification/providers/notifications-provider";
import { Button } from "../../../components/shared/utilities/form/button";
import { NotFound } from "../../../components/shared/utilities/not-found";
import { Dropdown } from "../../../components/shared/utilities/popover/dropdown";
import { Popover } from "../../../components/shared/utilities/popover/popover";
import { useAuth } from "./../../../lib/providers/auth-provider";

interface PropsType extends ReactProps {}

export function HeaderUser({ ...props }: PropsType) {
  const { user, logout, saveCurrentPath } = useAuth();
  const {
    notificationCount,
    generalNotifications,
    personalNotifications,
    generalTotal,
    personalTotal,
    loadNotifications,
  } = useNotificationContext();
  const [visible, setVisible] = useState(4);
  const userRef = useRef();
  const notifyRef = useRef();
  const modes = [
    { value: "general", label: "Thông báo chung" },
    { value: "personal", label: "Thông báo cá nhân" },
  ];
  const [mode, setMode] = useState(modes[0].value);

  const handleShowMorePosts = () => {
    setVisible((prevValue) => prevValue + visible);
  };

  const menus = [
    {
      text: "Thông tin tài khoản",
      href: "/profile",
    },
    {
      text: "Lịch sử đơn hàng",
      href: "/profile/order-history",
    },
    {
      text: "Thông báo",
      href: "/profile/notification",
    },
    {
      text: "Điểm thưởng",
      href: "/profile/reward-point",
    },
    {
      text: "",
    },
    {
      text: "Đăng xuất",
      onClick: () => logout(),
    },
  ];

  return (
    <>
      {user ? (
        <>
          <div className="relative mr-2">
            <a
              ref={notifyRef}
              className="btn-default p-0 h-10 w-14 mr-2  hover:bg-primary-light hover:text-primary focus:outline-none"
            >
              <img className="h-8" src="/assets/img/bell.png" />
              {notificationCount > 0 && (
                <div className="rounded-full flex-center bg-red-500 box-shadow-white absolute right-2 top-0 text-white font-semibold h-5 min-w-5 text-xs p-1">
                  <span>{notificationCount}</span>
                </div>
              )}
            </a>
            <Popover
              style={{ width: "300px" }}
              maxWidth="300px"
              reference={notifyRef}
              trigger="click"
              placement="bottom-start"
            >
              <div className="border-group rounded d-flex w-full">
                {modes.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMode(m.value)}
                    className={`px-3 py-2 flex-1 whitespace-nowrap focus:outline-none font-semibold border ${
                      mode == m.value
                        ? "border-primary bg-primary text-white"
                        : "border-gray-300 text-gray-600 hover:border-primary hover:text-primary"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
              <div>
                {(mode == "general" && !generalNotifications.length) ||
                (mode == "personal" && !personalNotifications.length) ? (
                  <NotFound text="Không có thông báo nào" />
                ) : (
                  <div className="-mx-2 px-3 mt-2 v-scrollbar" style={{ maxHeight: "300px" }}>
                    {(mode == "general" ? generalNotifications : personalNotifications).map(
                      (notify, index) => (
                        <Link key={notify.code} href={notify.link || "/"}>
                          <a
                            target="_blank"
                            className={`block py-2 ${
                              index == 0 ? "pt-0" : ""
                            } border-b border-gray-100 group`}
                          >
                            <div className="flex items-start justify-between mb-0.5">
                              <div className="text-sm font-semibold group-hover:text-primary">
                                {notify.title}
                              </div>
                              <div className="text-12 pt-0.5 whitespace-nowrap text-gray-500 group-hover:text-gray-700">
                                {formatDistanceToNow(new Date(notify.createdAt), {
                                  addSuffix: true,
                                  locale: viLocale,
                                })}
                              </div>
                            </div>
                            <div className="text-12 text-gray-500 group-hover:text-gray-700">
                              {notify.content}
                            </div>
                          </a>
                        </Link>
                      )
                    )}
                    {((mode == "general" && generalNotifications.length < generalTotal) ||
                      (mode == "personal" && personalNotifications.length < personalTotal)) && (
                      <Button
                        className="w-full"
                        textPrimary
                        text="Tải thêm"
                        asyncLoading
                        onClick={loadNotifications}
                      />
                    )}
                  </div>
                )}
              </div>
            </Popover>

            {/* <Menu>
              {({ open }) => (
                <>
                  <Menu.Button className="relative flex items-center px-0 lg:px-3 mr-0 cursor-pointer hover:text-primary focus:outline-none">
                    <div className="flex-shrink-0 w-12 lg:w-10">
                      <a className="btn-default p-0 h-10 w-14 mr-2  hover:bg-primary-light">
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
                      className="max-h-72 h-scrollbar z-50	absolute left-0 lg:right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                    >
                      {listNotification?.length > 0 && listNotification[0] !== undefined ? (
                        listNotification.slice(0, visible)?.map((notification, index) => {
                          return (
                            <div
                              className="w-full pl-5 pr-2.5 py-3 hover:bg-primary-light cursor-pointer"
                              onClick={() => router.push(`${notification.link}`)}
                              key={index}
                            >
                              <p className="text-gray-700 text-14 leading-4">
                                {notification?.content}
                              </p>
                              <p className="text-gray-400 text-10">
                                {formatDistanceToNow(new Date(notification?.createdAt), {
                                  addSuffix: true,
                                  locale: viLocale,
                                })}
                              </p>
                            </div>
                          );
                        })
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
            </Menu> */}
          </div>

          <div className="relative border-l border-gray-100">
            <div
              ref={userRef}
              className="relative flex items-center px-3 mr-0 cursor-pointer hover:text-primary focus:outline-none"
            >
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
            </div>
            <Dropdown reference={userRef}>
              {menus.map((menu, index) =>
                menu.text ? (
                  <Dropdown.Item key={index} {...menu} />
                ) : (
                  <Dropdown.Divider key={index} />
                )
              )}
            </Dropdown>
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
