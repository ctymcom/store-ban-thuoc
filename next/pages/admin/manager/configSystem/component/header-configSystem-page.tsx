import { useState } from 'react'
export function HeaderConfigSystemPage({ onclick }) {
    const [Session, setSession] = useState(1);
    const actived = 'border-b-4 border-secondary-500'
    return (
        <>
            <div className="w-full border-b border-gray-300">
                <div className="container flex ">
                    <div className={'transition cursor-pointer ' + (Session == 1 && actived)} onClick={() => { onclick(1); setSession(1) }}>
                        <div className="pr-16 md:pr-6 py-3">
                            <p className='text-lg py-1'>Thông tin danh nghiệp</p>
                            <p className='text-xs text-gray-400'>Dữ liệu tổng quan</p>
                        </div>
                    </div>
                    <div className={'transition cursor-pointer ' + (Session == 2 && actived)} onClick={() => { onclick(2); setSession(2) }}>
                        <div className="pr-16 md:pr-6 py-3">
                            <p className='text-lg py-1'>Thông tin chương trình</p>
                            <p className='text-xs text-gray-400'>Cài đặt các thông tin</p>
                        </div>
                    </div>
                    <div className={'transition cursor-pointer ' + (Session == 3 && actived)} onClick={() => { onclick(3); setSession(3) }}>
                        <div className="pr-16 md:pr-6 py-3">
                            <p className='text-lg py-1'>Tài khoản</p>
                            <p className='text-xs text-gray-400'>Thiết lập tài khoản</p>
                        </div>
                    </div>
                    <div className={'transition cursor-pointer ' + (Session == 4 && actived)} onClick={() => { onclick(4); setSession(4) }}>
                        <div className="pr-16 md:pr-6 py-3">
                            <p className='text-lg py-1'>Chống gian lận</p>
                            <p className='text-xs text-gray-400'>Cài đặt chống gian lận</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}