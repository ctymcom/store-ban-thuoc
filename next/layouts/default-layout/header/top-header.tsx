import Link from "next/link"

export function TopHeader() {  
  const topMenus = [
    {
      label: "Góc sức khoẻ",
      path: "/health"
    },
    {
      label: "Tuyển dụng",
      path: "/recruitment"
    },
  ]

  return <>
    <div className="bg-gray-200 hidden md:block">
      <div className="main-container flex items-center justify-end ">
        {topMenus.map((menu, index) => (
          <Link href={menu.path} key={index}>
            <a className="py-1 text-sm text-gray-500 hover:underline hover:text-primary px-4">{menu.label}</a>
          </Link>
        ))}
      </div>
    </div>
  </>
}