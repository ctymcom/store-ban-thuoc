import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function SubMenu(props) {
    var { item } = props
    const { pathname } = useRouter();
    const [Open, setOpen] = useState(pathname.includes(item.path));
    const open = () => {
        setOpen(!Open);
    }
    return (
        <>
            <li className='mb-3 pt-2 pb-2 items-center cursor-pointer   ' onClick={open}>
                <div className="flex items-center hover:text-red-600">
                    <div className="icon w-5 h-5 mr-3 ">
                        {item.icon}
                    </div>
                    <span className='font-bold text-gray-500 text-sm '>{item.title}</span>
                    <span className='flex-auto'></span>
                    <i className={Open ? "duration-100 sidebar-menu-item-collapse w-4 h-4 transform rotate-180" : "duration-100 sidebar-menu-item-collapse w-4 h-4 transform rotate-0 focus:rotate-0"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className='fill-current arrow'>
                            <path d="M8 6.81l3.97 3.97a.75.75 0 0 0 1.06-1.06l-4.5-4.5a.75.75 0 0 0-1.06 0l-4.5 4.5a.75.75 0 0 0 1.06 1.06L8 6.81z">
                            </path>
                        </svg>
                    </i>
                </div>
                <Transition
                    className="transition-opacity duration-100"
                    show={Open}
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <ul className="text-sm align-baseline pl-6 pt-2">
                        {item.subNav.map((item, index) => {
                            const activated = item.path == pathname;
                            return <Link href={item.path} key={index}>
                                <li className={'flex w-full ' + (activated && 'bg-yellow-400')}>
                                    <span className={'flex space-y-6 py-2 text-gray-600 hover:text-red-400 '}> {item.title} </span>
                                </li>
                            </Link>
                        })}
                    </ul>
                </Transition>
            </li>
        </>
    )
} 
