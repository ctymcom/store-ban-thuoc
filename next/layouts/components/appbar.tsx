import react, { useState } from 'react'
import Link from 'next/link'
import { AppbarItems } from './appbar-items';

export function Appbar() {
    const [openProfile, setopenProfile] = useState(false);
    const [openNotic, setopenNotic] = useState(false);
    return (
        <>
            <div className="top-0 left-0 fixed w-full h-14 min-h-48 max-h-14 bg-white z-50 shadow flex items-center font-sans">
                <Link href='/'>
                    <img src="../../../public/assets/logo/dashboard.svg" alt="" className='w-10 h-10 cursor-pointer items-center mx-6' />
                </Link>
                <div className="title text-xl w-full h-full flex items-center">
                    <Link href='/'>
                        Dashboard
                    </Link>
                </div>
                <div className="relative flex items-center w-72 h-50 line-white " onMouseOver={() => setopenProfile(true)} onMouseLeave={() => setopenProfile(false)}>
                    <div className="inline-block hover:bg-gray-100 rounded-full ">
                        <div className="relative">
                            <div className="account-info h-10 flex items-center w-full p-1  duration-100  cursor-pointer">
                                <img src="https://i.pinimg.com/564x/2a/d1/b2/2ad1b27925c0db7a8dafe63186824bc0.jpg" alt="" className='w-8 h-8 items-center mr-2  rounded-full' />
                                <span className=' inline p-1 pr-2 tracking-normal text-gray-700'>LamQuangVinh</span>
                            </div>
                        </div>
                    </div>
                    <div onMouseOver={() => setopenProfile(true)} onMouseLeave={() => setopenProfile(false)}
                        className={`${openProfile ? 'block' : 'hidden'} z-50 absolute bg-white left-8 top-10 shadow-md rounded-sm max-w-6xl origin-top  with-arrow `}>
                        <div className="container">
                            <ul >
                                <li className='hover:bg-gray-200 px-5 py-5 h-8 z-50 flex items-center cursor-pointer'>
                                    <span data-v-57a7eade="" className="w-4 h-4 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                            <path d="M23.9 12.9l-1.6-1.6 6.2-6.2 1.6 1.6-6.2 6.2zM32 4.8l-1.6-1.6-1 1L31 5.8l1-1zM19.7 15.6l2.6-1.4-1.3-1.3-1.3 2.7zm8.6-4v16.3c0 .9-.7 1.6-1.6 1.6H1.6c-.9 0-1.6-.7-1.6-1.6V6.2c0-.9.7-1.6 1.6-1.6h24.2l-2 2H2v11.9l5.6-3.8 7.2 6.1 6.7-3 4.7 4.1v-8.4l2.1-1.9zm-2 15.9v-2.9l-5.1-4.4-6.7 3-7-6L2 21v6.5h24.3z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span className="text-sm">Hồ Sơ Shop</span>
                                </li>
                                <li className='hover:bg-gray-200 px-5 py-5 h-8 z-50 flex items-center cursor-pointer'>
                                    <span data-v-57a7eade="" className="w-4 h-4 mr-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                            <path d="M23.9 12.9l-1.6-1.6 6.2-6.2 1.6 1.6-6.2 6.2zM32 4.8l-1.6-1.6-1 1L31 5.8l1-1zM19.7 15.6l2.6-1.4-1.3-1.3-1.3 2.7zm8.6-4v16.3c0 .9-.7 1.6-1.6 1.6H1.6c-.9 0-1.6-.7-1.6-1.6V6.2c0-.9.7-1.6 1.6-1.6h24.2l-2 2H2v11.9l5.6-3.8 7.2 6.1 6.7-3 4.7 4.1v-8.4l2.1-1.9zm-2 15.9v-2.9l-5.1-4.4-6.7 3-7-6L2 21v6.5h24.3z">
                                            </path>
                                        </svg>
                                    </span>
                                    <span className="text-sm">Hồ Sơ Shop</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="action-header px-7 flex  space-x-3 max-w-5xl ">
                    <div className="h-full relative duration-300 " onMouseOver={() => setopenNotic(true)} onMouseLeave={() => setopenNotic(false)}>
                        <div className='w-10 h-10'>
                            <div className="dropdown w-10 h-10 flex items-center justify-center hover:bg-gray-100 duration-100 rounded-full cursor-pointer">
                                <div className="dropdown-button w-4 h-4">
                                    <i className="">
                                        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className='fill-current'>
                                            <path d="M1 1.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V1.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 002.718 1H1.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM1.282 0h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134H1.282c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378C.046 3.325 0 3.164 0 2.718V1.282C0 .836.046.675.134.512A.909.909 0 01.512.134C.675.046.836 0 1.282 0zM1 7.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V7.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 002.718 7H1.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM1.282 6h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134H1.282c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378C.046 9.325 0 9.164 0 8.718V7.282c0-.446.046-.607.134-.77a.909.909 0 01.378-.378C.675 6.046.836 6 1.282 6zM1 13.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275v-1.436c0-.181-.002-.245-.007-.275A2.248 2.248 0 002.718 13H1.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM1.282 12h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134H1.282c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 01.378-.378c.163-.088.324-.134.77-.134zM7 1.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V1.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 008.718 1H7.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM7.282 0h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134H7.282c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378C6.046 3.325 6 3.164 6 2.718V1.282c0-.446.046-.607.134-.77a.909.909 0 01.378-.378C6.675.046 6.836 0 7.282 0zM7 7.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V7.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 008.718 7H7.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM7.282 6h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134H7.282c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378C6.046 9.325 6 9.164 6 8.718V7.282c0-.446.046-.607.134-.77a.909.909 0 01.378-.378c.163-.088.324-.134.77-.134zM7 13.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275v-1.436c0-.181-.002-.245-.007-.275A2.248 2.248 0 008.718 13H7.282c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM7.282 12h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134H7.282c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 01.378-.378c.163-.088.324-.134.77-.134zM13 1.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V1.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0014.718 1h-1.436c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM13.282 0h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378c-.088-.163-.134-.324-.134-.77V1.282c0-.446.046-.607.134-.77a.909.909 0 01.378-.378c.163-.088.324-.134.77-.134zM13 7.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275V7.282c0-.181-.002-.245-.007-.275A2.248 2.248 0 0014.718 7h-1.436c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM13.282 6h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378c-.088-.163-.134-.324-.134-.77V7.282c0-.446.046-.607.134-.77a.909.909 0 01.378-.378c.163-.088.324-.134.77-.134zM13 13.282v1.436c0 .181.002.245.007.275.03.005.094.007.275.007h1.436c.181 0 .245-.002.275-.007.005-.03.007-.094.007-.275v-1.436c0-.181-.002-.245-.007-.275a2.248 2.248 0 00-.275-.007h-1.436c-.181 0-.245.002-.275.007-.005.03-.007.094-.007.275zM13.282 12h1.436c.446 0 .607.046.77.134.163.087.291.215.378.378.088.163.134.324.134.77v1.436c0 .446-.046.607-.134.77a.909.909 0 01-.378.378c-.163.088-.324.134-.77.134h-1.436c-.446 0-.607-.046-.77-.134a.909.909 0 01-.378-.378c-.088-.163-.134-.324-.134-.77v-1.436c0-.446.046-.607.134-.77a.909.909 0 01.378-.378c.163-.088.324-.134.77-.134z" fillRule="evenodd">
                                            </path>
                                        </svg>
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div onMouseOver={() => setopenNotic(true)} onMouseLeave={() => setopenNotic(false)}
                            className={`${openNotic ? 'block' : 'hidden'} hover:block w-80 text-center max-w-5xl z-50 absolute bg-white -left-32 top-10 shadow-md rounded-sm origin-top  with-arrow `}>
                            <div className="container p-4">
                                <div className="items flex flex-wrap">
                                    {AppbarItems.map((item, index) => {
                                        return <div className="item p-3 max-w-xs h-36   cursor-pointer" key='index'>
                                            <div className="w-16 h-16  ">
                                                <div className="w-16 h-16 bg-gradient-to-r hover:from-yellow-500 from-yellow-400 via-red-500 to-pink-500 flex justify-center items-center rounded-full">
                                                    <div className="w-8 h-8 ">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d={item.icon}></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <span className="block">{item.title}</span>
                                            </div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="h-full">
                        <div className="dropdown w-10 h-10 flex items-center justify-center hover:bg-gray-100 duration-100 rounded-full cursor-pointer">
                            <div className="dropdown-button w-4 h-4">
                                <i className="">
                                    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className='fill-current'>
                                        <path d="M10 15a1 1 0 01-1 1H7a1 1 0 01-1-1h4zM8.5 0a.5.5 0 01.5.5v.593a5.4 5.4 0 014.383 4.892l.54 7.015h.577a.5.5 0 110 1h-13a.5.5 0 110-1h.577l.54-7.015A5.4 5.4 0 017 1.093V.5a.5.5 0 01.5-.5h1zM8 2a4.4 4.4 0 00-4.386 4.062L3.08 13h9.84l-.534-6.938A4.4 4.4 0 008 2z" fillRule="evenodd"></path>
                                    </svg>
                                </i>
                            </div>
                        </div>
                    </div>
                    <div className="link-out flex items-center justify-center cursor-pointer">
                        <div className=" px-3 py-1 rounded-full border-solid border border-gray-300 text-sm hover:bg-gray-100">
                            <Link href='/'>
                                LINKOUT
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
