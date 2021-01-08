import react, { useState } from 'react'
import Link from 'next/link'
export default function SubMenu(props) {
    var { item } = props
    const [Open, setOpen] = useState(false);
    const open = () => {
        setOpen(!Open);
    }
    return (
        <>
            <li className='mb-3 pt-2 pb-2 items-center cursor-pointer' onClick={open}>
                <div className="flex items-center">
                    <img src={item.icon} alt="" className='w-4 h-4 mr-3' />
                    <span className='font-bold text-gray-400 text-sm'>{item.title}</span>
                    <span className='flex-auto'></span>
                    <i data-v-6ac60730="" className={Open ? "duration-200 sidebar-menu-item-collapse w-4 h-4 transform rotate-180 focus:rotate-0" : "duration-200 sidebar-menu-item-collapse w-4 h-4 transform rotate-0 focus:rotate-0"}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className='fill-current arrow'>
                            <path d="M8 6.81l3.97 3.97a.75.75 0 0 0 1.06-1.06l-4.5-4.5a.75.75 0 0 0-1.06 0l-4.5 4.5a.75.75 0 0 0 1.06 1.06L8 6.81z">
                            </path>
                        </svg>
                    </i>
                </div>
                {Open ?
                    <ul className='text-sm align-baseline pl-6 pt-2'>
                        {item.subNav.map((item, index) => {
                            return <Link href={item.path} key={index}>
                                <li className='flex w-full '>
                                    <span className='flex space-y-6 pt-1 pb-0 text-gray-600 hover:text-red-400'> {item.title} </span>
                                    {item.new ?
                                        <span className='text-center text-xs pl-0.5 pr-0.5 ml-3 text-white rounded-br-lg rounded-bl-lg rounded-tl-lg bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 flex justify-end items-center'>New</span> :
                                        null
                                    }
                                </li>
                            </Link>
                        })}
                    </ul> :
                    null
                }

            </li>
        </>
    )
} 
