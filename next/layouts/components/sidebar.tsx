import { SubMenu } from './submenu';
import { SidebarData } from './sidebar-data';
export default function Sidebar() {
    return (
        <>
            <div className="w-60"></div>
            <div className="fixed inset-0 top-14 overflow-auto bg-white shadow z-0 w-60">
                <div className="py-4 ">
                    <ul className='text-gray-500 text-base w-full'>
                        {SidebarData.map((items, index) => {
                            return <SubMenu item={items} key={index}></SubMenu>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
} 
