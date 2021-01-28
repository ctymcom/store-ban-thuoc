import { SelectBox } from "../../components/shared/form/select-box";
import { IconLogout } from "../../lib/svg/icon-logout";

type SidebarProps = {
  [x: string]: any;
  activeMenu?: string;
  activeSubmenu?: string;
};
export default function Sidebar({ activeMenu, activeSubmenu, ...props }: SidebarProps) {
  return (
    <>
      <div className="h-full w-60">
        <div className="fixed min-h-screen inset-0 top-0 bg-white shadow z-40 w-60">
          <div className=" flex justify-between flex-col h-full">
            <div className="py-12 flex flex-col justify-center items-center ">
              <div className="flex items-center px-8">
                <div className="w-16 rounded-full">
                  <img src="https://vanhienblog.info/wp-content/uploads/2019/02/anh-gai-xinh-dep-hot-girl-3.jpg" alt=""
                    className='rounded-full' />
                </div>
                <div className=" ml-5">
                  <div className="flex items-center">
                    <p className="">Thu Trinh</p>
                    <span className='w-2 h-2 rounded-full ml-2 bg-primary-400'></span>
                  </div>
                  <div className="text-xs font-semibold text-gray-400">Co-founder</div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start py-4 px-8">
                <div className="uppercase text-sm font-semibold text-gray-400">Bộ phận</div>
                <div className="w-full py-2">
                  <SelectBox
                    options={['Marketing', 'Nhân sự']}
                    style='py-2'
                  />
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start py-4">
                <div className="uppercase text-sm font-semibold text-gray-400 px-8">Quản trị</div>
                <ul className="text-gray-500 text-base w-full px-8 py-2">
                  <li className="py-2 text-sm font-semibold">Bài viết</li>
                  <li className="py-2 text-sm font-semibold">Đăng bài</li>
                  <li className="py-2 text-sm font-semibold">Cấu hình giao diện</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center cursor-pointer text-gray-400 px-8 py-4 space-x-2">
              <p className="uppercase font-semibold">Đăng xuất</p>
              <div className="w-5">
                <IconLogout />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
