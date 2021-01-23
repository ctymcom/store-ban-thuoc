import { SubMenu } from "./submenu";
import { SidebarData } from "./sidebar-data";
type SidebarProps = {
  [x: string]: any;
  activeMenu?: string;
  activeSubmenu?: string;
};
export default function Sidebar({ activeMenu, activeSubmenu, ...props }: SidebarProps) {
  return (
    <>
      <div className="w-60"></div>
      <div className="fixed inset-0 top-14 overflow-auto bg-white shadow z-40 w-60">
        <div className="py-4 ">
          <ul className="text-gray-500 text-base w-full">
            {SidebarData.map((item, index) => {
              return (
                <SubMenu
                  opened={item.title == activeMenu}
                  activeSubmenu={activeSubmenu}
                  item={item}
                  key={index}
                ></SubMenu>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
