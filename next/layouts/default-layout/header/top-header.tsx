import Link from "next/link"
import { useHeaderContext } from "../providers/header-provider"

export function TopHeader() {

  const { topMenus } = useHeaderContext()

  return <>
  {
    topMenus && 
    <div className="bg-gray-200 hidden md:block">
      <div className="main-container flex items-center justify-end ">
        {topMenus.map((menu, index) => (
          <Link href={menu.link} key={index}>
            <a className="py-1 text-sm text-gray-500 hover:underline hover:text-primary px-4">{menu.name}</a>
          </Link>
        ))}
      </div>
    </div>
  }
  </>
}