import { useRouter } from 'next/router';

export function MenuItem({ item, ...props }) {
    const { pathname } = useRouter();
    const isActivated = pathname == item.href;
    return <li className="relative px-6 py-3">
     { isActivated && <span
      className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
      aria-hidden="true"
    ></span>}
    
    <a
      className={(isActivated && "text-gray-800 dark:text-gray-100") + " inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"}
      href={item.href}
        ><svg
        className="w-5 h-5"
        aria-hidden="true"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path d={item.icon}></path>
    </svg>
      <span className="ml-4">{item.label}</span>
    </a>
  </li>
}