import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { SidebarData } from '../../../next/layouts/components/sidebar-data'
import { BreadcrumbItem } from '../dashboard-layout';
import { IconArrowRight } from '../../lib/svg/icon-arrow-right';
import { IconRing } from '../../lib/svg/icon-ring';
import { IconUser } from './../../lib/svg/icon-user';
import { IconLogout } from './../../lib/svg/icon-logout';
type AppBarProps = {
    breadcrumbs?: BreadcrumbItem[],
    [x: string]: any
}
export function Appbar({ breadcrumbs }: AppBarProps) {
    const [openProfile, setopenProfile] = useState(false);
    const [openNotic, setopenNotic] = useState(false);
    const [linkAdress, setlinkAdress] = useState([]);
    var arr = [];
    const { pathname } = useRouter();
    useEffect(() => {
        SidebarData.forEach((item, index) => {
            if (pathname.search(item.path) > -1) {
                var link = {
                    title: item.title,
                    path: item.path
                }
                arr.push(link)
                setlinkAdress([...arr])
                item.subNav.forEach((item, index) => {
                    if (item.path == pathname) {
                        var link = {
                            title: item.title,
                            path: item.path
                        }
                        arr.push(link)
                        setlinkAdress([...arr])
                    }
                })
            }
        })
    }, []);
    console.log(pathname)
    return (
        <>
            <div className="top-0 left-0 fixed w-full h-14 min-h-48 max-h-14 bg-white z-50 shadow flex items-center font-sans">
                <Link href='/'>
                    <div className='block py-3 px-6'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="40" viewBox="0 0 142 60">
                            <g id="Group_38420" data-name="Group 38420" transform="translate(1755.908 359.729)">
                                <g id="Group_38419" data-name="Group 38419" transform="translate(-1755.908 -359.729)">
                                    <path id="Path_10599" data-name="Path 10599" d="M-1714.075-293.74l-5.436-2.521-4.978,5.354a1.733,1.733,0,0,1-2.2.455l-21.083-9.791-4.129,4.427c-1.181,1.267-1.039,1.981.554,2.722q5.667,2.634,11.337,5.261c1.269.59,1.265.592.27,1.653q-4.638,4.942-9.27,9.89c-.932,1-.786,1.8.447,2.381,3.912,1.836,7.842,3.636,11.757,5.465a1.534,1.534,0,0,0,1.988-.372q10.574-11.31,21.162-22.607C-1712.767-292.378-1712.915-293.186-1714.075-293.74Z" transform="translate(1754.202 328.236)" fill="#e74d3d" />
                                    <path id="Path_10600" data-name="Path 10600" d="M-1742.145-337.463l20.927,9.707,4.156-4.471c1.129-1.21.987-1.958-.52-2.661-3.846-1.794-7.682-3.612-11.557-5.341-1.034-.462-.94-.761-.249-1.483,3.07-3.207,6.1-6.458,9.124-9.705,1.345-1.443,1.2-2.06-.626-2.911-3.636-1.691-7.288-3.351-10.9-5.09a1.954,1.954,0,0,0-2.656.492q-10.34,11.127-20.751,22.189c-1.088,1.162-.932,1.865.512,2.582l5.2,2.417,4.852-5.2A1.81,1.81,0,0,1-1742.145-337.463Z" transform="translate(1755.908 359.729)" fill="#fbd109" />
                                    <path id="Path_10601" data-name="Path 10601" d="M-1718.967-297.653l4.978-5.354-20.927-9.707a1.81,1.81,0,0,0-2.486.522l-4.852,5.2,21.083,9.791A1.733,1.733,0,0,0-1718.967-297.653Z" transform="translate(1748.679 334.981)" fill="#f99e26" />
                                </g>
                                <path id="Path_10602" data-name="Path 10602" d="M-1602.863-333.845c-.963-.2-1.258.566-1.591,1.233-1.756,3.508-4.13,8.253-5.921,11.811-1.935-3.859-4.108-8.187-6.022-12.029-.316-.634-.666-1.19-1.487-1.018-.843.176-.9.842-.895,1.544q.01,6.781,0,13.562c0,.808.1,1.566,1.1,1.585,1.078.021,1.186-.783,1.183-1.63-.008-2.485-.01-6.5.006-9.135,1.307,2.464,4.623,9.217,4.809,9.586.276.549.485,1.176,1.274,1.2.861.026,1.071-.65,1.365-1.235,1.439-2.858,3.323-6.575,4.808-9.527v1.64q0,3.916,0,7.833c0,.78.357,1.294,1.181,1.275.766-.018,1.069-.537,1.1-1.249.007-.194,0-.39,0-.584q0-6.547,0-13.094C-1601.95-332.827-1601.879-333.642-1602.863-333.845Z" transform="translate(-72.524 -13.686)" fill="#282828" />
                                <path id="Path_10603" data-name="Path 10603" d="M-1613.514-276.475a8.244,8.244,0,0,1-8.372-8.372,8.275,8.275,0,0,1,8.385-8.375,8.306,8.306,0,0,1,8.384,8.387A8.276,8.276,0,0,1-1613.514-276.475Zm-6.148-8.373a6.186,6.186,0,0,0,6.18,6.155,6.159,6.159,0,0,0,6.124-6.2,6.147,6.147,0,0,0-6.113-6.086A6.16,6.16,0,0,0-1619.663-284.848Z" transform="translate(-70.881 -35.211)" fill="#282828" />
                                <path id="Path_10604" data-name="Path 10604" d="M-1640.451-317.15a5.083,5.083,0,0,1-3.887-1.992c-.492-.607-.721-1.294-.033-1.854.67-.545,1.258-.251,1.789.389a2.842,2.842,0,0,0,3.737.845,2.911,2.911,0,0,0,1.417-3.28,2.925,2.925,0,0,0-1.914-1.9c-.716-.3-1.48-.491-2.182-.819a4.073,4.073,0,0,1-2.466-4.131A4.388,4.388,0,0,1-1641-333.7a4.377,4.377,0,0,1,4.742,1.4c.509.623.857,1.323.13,1.951s-1.353.214-1.852-.461a1.9,1.9,0,0,0-2.391-.659,2,2,0,0,0-1.346,2.1,1.807,1.807,0,0,0,1.409,1.662,14.758,14.758,0,0,1,2.594,1.037,4.947,4.947,0,0,1,2.465,5.759A5.217,5.217,0,0,1-1640.451-317.15Z" transform="translate(-58.765 -13.665)" fill="#282828" />
                                <path id="Path_10605" data-name="Path 10605" d="M-1506.6-333.883q-5.023.013-10.046,0c-.784,0-1.317.295-1.314,1.124,0,.846.589,1.113,1.341,1.117.732,0,2.8,0,3.886,0-.025,2.8.018,11.2.006,13.117,0,.764.286,1.372,1.116,1.372.9,0,1.14-.568,1.147-1.372,0-.263.021-9.111-.012-13.125.862,0,3.116.014,3.9.006.754-.008,1.329-.292,1.317-1.138S-1505.827-333.885-1506.6-333.883Z" transform="translate(-125.831 -13.684)" fill="#282828" />
                                <path id="Path_10606" data-name="Path 10606" d="M-1574.57-293.057c-.8-.511-1.353,0-1.81.7-1.167,1.785-2.372,3.545-3.63,5.418-1.259-1.885-2.46-3.654-3.629-5.445-.459-.7-1.018-1.182-1.818-.656-.815.535-.556,1.24-.09,1.927,1.246,1.839,3.113,4.645,4.421,6.536-.022,1.925,0,4.98-.005,6.64,0,.8.225,1.434,1.148,1.423s1.1-.674,1.1-1.461c-.013-1.637.012-4.608-.008-6.53,1.336-1.956,3.257-4.852,4.4-6.531C-1574.013-291.745-1573.69-292.494-1574.57-293.057Z" transform="translate(-89.872 -35.19)" fill="#282828" />
                                <path id="Path_10607" data-name="Path 10607" d="M-1468.475-293.057c-.8-.511-1.354,0-1.81.7-1.167,1.785-2.372,3.545-3.63,5.418-1.259-1.885-2.459-3.654-3.628-5.445-.46-.7-1.019-1.182-1.819-.656-.815.535-.556,1.24-.091,1.927,1.246,1.839,3.113,4.645,4.421,6.536-.022,1.925,0,4.98-.005,6.64,0,.8.225,1.434,1.148,1.423s1.1-.674,1.1-1.461c-.013-1.637.011-4.608-.008-6.53,1.336-1.956,3.257-4.852,4.4-6.531C-1467.918-291.745-1467.6-292.494-1468.475-293.057Z" transform="translate(-145.986 -35.19)" fill="#282828" />
                                <path id="Path_10608" data-name="Path 10608" d="M-1635.076-278.621c.8-.006,1.446.176,1.441,1.092s-.662,1.1-1.457,1.1c-2.725-.017-5.451-.028-8.176,0-1.051.012-1.475-.429-1.46-1.468.032-2.3.01-4.594.01-6.891,0-2.219.007-4.438,0-6.658,0-.815-.024-1.687,1.078-1.7,1.177-.015,1.159.907,1.158,1.757,0,3.855.034,8.913-.025,12.766Z" transform="translate(-58.803 -35.252)" fill="#282828" />
                                <path id="Path_10609" data-name="Path 10609" d="M-1518.616-278.621c.8-.006,1.447.176,1.441,1.092s-.661,1.1-1.457,1.1c-2.725-.017-5.451-.028-8.175,0-1.05.012-1.475-.429-1.46-1.468.032-2.3.01-4.594.01-6.891,0-2.219.008-4.438,0-6.658,0-.815-.023-1.687,1.079-1.7,1.176-.015,1.158.907,1.158,1.757,0,3.855.034,8.913-.025,12.766Z" transform="translate(-120.399 -35.252)" fill="#282828" />
                                <path id="Path_10610" data-name="Path 10610" d="M-1547.7-283.461l0,.008.036.091C-1547.681-283.4-1547.688-283.427-1547.7-283.461Z" transform="translate(-110.128 -40.379)" fill="none" />
                                <path id="Path_10611" data-name="Path 10611" d="M-1548.81-277.853q-2.593-6.637-5.177-13.279c-.25-.639-.4-1.408-1.33-1.408s-1.091.755-1.342,1.4q-2.572,6.583-5.128,13.173c-.126.325-.231.657-.318.909.01.663.252,1.076.821,1.224a1.089,1.089,0,0,0,1.385-.756c.432-1.069,1.462-3.732,1.9-4.859h5.348c.482,1.291,1.284,3.292,1.71,4.419.3.783.661,1.535,1.664,1.148S-1548.506-277.074-1548.81-277.853Zm-8.293-5.828,1.771-4.587,0,.008,0-.008c.013.034.02.065.033.1.621,1.6,1.165,3.005,1.738,4.488Z" transform="translate(-102.5 -35.572)" fill="#282828" />
                                <path id="Path_10612" data-name="Path 10612" d="M-1564.357-319.18q-2.593-6.638-5.177-13.279c-.25-.639-.4-1.408-1.33-1.408s-1.091.755-1.342,1.4q-2.573,6.584-5.128,13.173c-.126.325-.231.657-.318.909.01.663.251,1.076.821,1.224a1.089,1.089,0,0,0,1.385-.756c.432-1.07,1.462-3.732,1.9-4.859h5.348c.482,1.29,1.284,3.292,1.71,4.419.3.783.661,1.535,1.664,1.148S-1564.052-318.4-1564.357-319.18Zm-8.293-5.828,1.771-4.587,0,.008,0-.008c.013.034.02.065.033.1l1.738,4.488Z" transform="translate(-94.278 -13.692)" fill="#282828" />
                                <path id="Path_10613" data-name="Path 10613" d="M-1498.285-293.218q-5.023.013-10.046,0c-.783,0-1.317.295-1.315,1.124,0,.845.589,1.113,1.341,1.117.733,0,2.8,0,3.886,0-.025,2.8.019,11.2.007,13.117,0,.764.286,1.372,1.117,1.372.9,0,1.139-.568,1.147-1.372,0-.263.021-9.111-.012-13.125.862,0,3.116.015,3.9.007.753-.008,1.328-.292,1.317-1.138S-1497.516-293.22-1498.285-293.218Z" transform="translate(-130.231 -35.213)" fill="#282828" />
                                <path id="Path_10614" data-name="Path 10614" d="M-1532.437-326.491h0a3.131,3.131,0,0,0-2.534-2.959c-.814-.051-3.263,0-3.263,0,0,.747,0,1.859,0,2.959s0,2.213,0,2.959c0,0,2.449.051,3.263,0a3.13,3.13,0,0,0,2.534-2.959Z" transform="translate(-115.132 -16.019)" fill="none" />
                                <path id="Path_10615" data-name="Path 10615" d="M-1532.3-319.189c-.859-1.345-1.666-2.724-2.553-4.049-.047-.071-.339-.587-.593-1.044a8.356,8.356,0,0,0,1.18-.826,4.358,4.358,0,0,0,1.3-2,5.123,5.123,0,0,0-.031-3.247,5.109,5.109,0,0,0-4.859-3.527c-1.168-.017-2.337-.007-3.5,0-1.444.006-1.718.266-1.724,1.683v.037c-.008,2.216,0,10.841,0,13.426v.2c0,.808.3,1.409,1.2,1.375.833-.031,1.088-.616,1.082-1.383q-.013-2.1,0-4.2s0-.412,0-.848h3.063c1.1,1.744,2.683,4.25,3.507,5.6.445.728,1.017,1.161,1.814.637C-1531.662-317.851-1531.884-318.531-1532.3-319.189Zm-8.5-6.68c0-.747,0-1.858,0-2.959s0-2.213,0-2.959c0,0,2.449-.051,3.263,0a3.131,3.131,0,0,1,2.534,2.959h0a3.13,3.13,0,0,1-2.534,2.959C-1538.358-325.818-1540.807-325.869-1540.807-325.869Z" transform="translate(-112.558 -13.681)" fill="#282828" />
                            </g>

                        </svg>
                    </div>
                </Link>
                <div className=" w-full h-full flex items-center space-x-4">
                    {
                        (breadcrumbs || linkAdress).map((item, index, array) => {
                            const actived = index == array.length - 1;
                            return <div className={(actived ? 'text-black font-semibold' : 'text-gray-400') + ' hover:text-black'} key={index}>
                                <Link href={item.path} >{item.title}</Link>
                            </div>
                        }).reduce((accu, elem, index): any => {
                            return accu === null ? [elem] : [...accu, <IconArrowRight key={(index * 2) + 1} className="w-4 h-4 text-gray-400"/>, elem]
                        }, null as any)
                    }
                </div>
                <div className="action-header px-7 flex  space-x-3 max-w-5xl ">
                    <div className="h-full relative duration-300 " onMouseOver={() => setopenNotic(true)} onMouseLeave={() => setopenNotic(false)}>
                        <div className="h-full">
                            <div className="dropdown w-10 h-10 flex items-center justify-center hover:bg-gray-100 duration-100 rounded-full cursor-pointer">
                                <div className="dropdown-button w-6 h-6">
                                    <i className="text-gray-400">
                                        <IconRing />
                                    </i>
                                </div>
                            </div>
                        </div>
                        <div onMouseOver={() => setopenNotic(true)} onMouseLeave={() => setopenNotic(false)}
                            className={`${openNotic ? 'block' : 'hidden'} hover:block w-80 text-center max-w-5xl z-50 absolute bg-white -left-52 top-10 shadow-md rounded-sm origin-top  with-arrow transition `}>
                            <div className="container p-4">
                                <div className="items flex flex-wrap">
                                    Thong bao
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative flex items-center w-72 h-50 line-white " onMouseOver={() => setopenProfile(true)} onMouseLeave={() => setopenProfile(false)}>
                    <div className="inline-block hover:bg-gray-100 rounded-full ">
                        <div className="relative">
                            <div className="account-info h-10 flex items-center w-full p-1  duration-100  cursor-pointer">
                                <img src="https://ss-images.catscdn.vn/2019/05/02/5086417/58673861_2082849575345662_5550445563004059648_n.jpg" alt="" className='w-8 h-8 items-center mr-2  rounded-full' />
                                <span className=' inline p-1 pr-2 tracking-normal text-gray-700'>LamQuangVinh</span>
                            </div>
                        </div>
                    </div>
                    <div onMouseOver={() => setopenProfile(true)} onMouseLeave={() => setopenProfile(false)}
                        className={`${openProfile ? 'block' : 'hidden'} z-50 absolute bg-white left-8 top-10 shadow-md rounded-sm max-w-6xl origin-top with-arrow transition-all `}>
                        <div className="container">
                            <ul >
                                <li className='hover:bg-gray-200 px-5 py-5 h-8 z-50 flex items-center cursor-pointer'>
                                    <div className="w-5 h-5 mr-3">
                                        <i className='text-gray-400'>
                                            <IconUser />
                                        </i>
                                    </div>
                                    <span className="text-sm">Hồ sơ</span>
                                </li>
                                <li className='hover:bg-gray-200 px-5 py-5 h-8 z-50 flex items-center cursor-pointer'>
                                    <div className="w-5 h-5 mr-3">
                                        <i className='text-gray-400'>
                                            <IconLogout />
                                        </i>
                                    </div>
                                    <span className="text-sm">Đăng xuất</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
