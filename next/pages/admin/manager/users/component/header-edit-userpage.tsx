import { useState } from 'react'
export function HeaderEditUserPage({ onclick }) {
    const [Session, setSession] = useState(1);
    const actived = 'border-b-4 border-secondary-500'
    return (
        <>
            <div className="w-full border-b border-gray-300">
                <div className="container flex ">
                    <div className={'cursor-pointer ' + (Session == 1 && actived)} onClick={() => { onclick(1); setSession(1) }}>
                        <div className="pr-16 py-3">
                            <p className='text-lg py-1'>Tài khoản</p>
                            <p className='text-xs text-gray-400'>Dữ liệu tổng quan</p>
                        </div>
                    </div>
                    <div className={'cursor-pointer ' + (Session == 2 && actived)} onClick={() => { onclick(2); setSession(2) }}>
                        <div className="pr-16 py-3">
                            <p className='text-lg py-1'>Phân quyền</p>
                            <p className='text-xs text-gray-400'>Phân quyền tài khoản</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}