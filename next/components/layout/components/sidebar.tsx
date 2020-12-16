import { SvgIcon } from '../../../lib/svg-icon';
import { MenuItem } from './menu-item';

export type SidebarProps = {
  title: string,
  routes: any[],
};
export function Sidebar({ title, routes }: SidebarProps) {
    return <>
    <aside
        className="z-20 hidden w-64 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="#" >
            {title}
          </a>
          <ul className="mt-6">
            {routes.map(m => <MenuItem key={m.label} item={m} />)}
          </ul>
        </div>
      </aside>
    </>
}