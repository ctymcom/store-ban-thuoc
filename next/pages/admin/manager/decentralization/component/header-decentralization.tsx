import { useState } from 'react'
export function HeaderDecentralizationPage() {
    return (
        <>
            <div className="w-full border-b border-gray-300">
                <div className="container flex ">
                    <div className={'transition cursor-pointer '}>
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