import { Menu, Transition } from '@headlessui/react';
import Link from "next/link";
import { HiChevronDown, HiOutlineBell } from "react-icons/hi";
import { useRouter } from 'next/router';
import { LOGIN_PATHNAME, useAuth } from './../../../lib/providers/auth-provider';

interface PropsType extends ReactProps {
}
export function HeaderUser({ ...props }: PropsType) { 

  const router = useRouter()
  const { user, logout, saveCurrentPath } = useAuth()

  return <>
  {
    user ? <>       
      <Link href="/profile/order-history">
        <a className="border-r btn-default p-0 h-10 w-16">
          <i className="text-24">
            <HiOutlineBell />
          </i>
          {/* <div className="rounded-full flex-center bg-primary box-shadow-white absolute right-2 top-0 text-white font-semibold h-5 min-w-5 text-xs p-1">
            <span>76</span>                
          </div> */}
        </a>
      </Link>
      <div className="relative">
        <Menu>
        {({ open }) => (
            <>
              <Menu.Button className="relative flex items-center px-4 cursor-pointer hover:text-primary focus:outline-none">
                <div className="flex-shrink-0 w-10">
                  <div className="image-wrapper round">
                    <img src={user.imageLink} onError={(e)=>{(e.target as any).src="/assets/img/avatar.svg"}}/>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="pl-3 pr-2 font-semibold text-left leading-tight">{user.nickname}</div>
                  <i className="text-24">
                    <HiChevronDown/>
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
                  className="z-50	absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                >
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => router.push('/profile')}
                        className={`${
                          active
                            ? "bg-gray-100 text-primary"
                            : "text-gray-700"
                        } btn-default flex justify-between w-full px-4 h-12 text-sm leading-5 text-left font-semibold`}
                      >
                        Thông tin tài khoản
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        onClick={() => logout()}
                        className={`${
                          active
                            ? "bg-gray-100 text-primary"
                            : "text-gray-700"
                        } btn-default flex justify-between w-full px-4 h-12 text-sm leading-5 text-left font-semibold`}
                      >
                        Đăng xuất
                      </a>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      </div>
    </> :
    <Link href="/login">
      <a className="btn-default h-12" onClick={saveCurrentPath}>
        Đăng nhập
      </a>
    </Link>
  }
  </>
}