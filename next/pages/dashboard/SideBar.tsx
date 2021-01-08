import SubMenu from '../../components/shared/menu/SubMenu'
import { useState, useRef } from 'react'

export const SidebarData = [
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
    {
        title: 'Quản Lý Đơn Hàng ',
        path: '/',
        icon: 'https://cf.shopee.vn/file/f82f8ccb649afcdf4f07f1dd9c41bcb0',
        isOpen: false,
        subNav: [
            {
                title: 'Tất cả',
                path: '/',
            }, {
                title: 'Đơn hủy',
                path: '/',
            }, {
                title: 'Trả Hàng/ Hoàn Tiền',
                path: '/',
            },
        ]

    },
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
    {
        title: 'Kênh Marketing ',
        path: '/',
        icon: 'https://cf.shopee.vn/file/2f9d62dd7e037c22608ac75dfb84a409',
        isOpen: false,
        subNav: [
            {
                title: 'Kênh Marketing',
                path: '/',
            }, {
                title: 'Quảng Cáo Shopee',
                path: '/',
            },
        ]

    },
    {
        title: 'Vận chuyển',
        path: '/',
        icon: 'https://cf.shopee.vn/file/c15905d5a6284687c4a6ad00d0feb511',
        isOpen: false,
        subNav: [
            {
                title: 'Quản Lý Vận Chuyển',
                path: '/',
            }, {
                title: 'Giao Hàng Loạt',
                path: '/',
            }, {
                title: 'Cài Đặt Vận Chuyển',
                path: '/',
            },
        ]

    },
]
export default function SideBar() {
    return (
        <>
            <div className="app-sidebar h-full">
                <div className="sidebar-container mt-12 min-h-screen top-0 w-56 bg-white shadow z-0">
                    <div className="p-4 relative ">
                        <ul className='text-gray-400 text-base'>
                            {SidebarData.map((items, index) => {
                                return <SubMenu item={items} key={index}></SubMenu>
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
} 
