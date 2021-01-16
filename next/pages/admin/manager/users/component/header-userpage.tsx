import { useState } from 'react'
import { Button } from "../../../../../components/shared/form/button";
import { Input } from "../../../../../components/shared/form/input";

export function HeaderUserPage(props) {
    const [View, setView] = useState(0);
    const handleView = (e) => {
        setView(e)
        props.handleView(e)
    }
    return <>
        <div className="wrapper">
            <div className="container">
                <div className="container-title">
                    <div className="title inline-block">
                        <h3 className='inline text-xl'>Truy cập danh sách</h3>
                        <p className='text-xs text-gray-400'>Danh sách người dùng hiện tại</p>
                    </div>
                    <div className="btn-create-user float-right flex justify-center">
                        <Button
                            text='Tạo tài khoản'
                        />
                    </div>
                </div>
                <div className="search">
                    <div className="input-search max-w-md py-2 h-full">
                        <div className="absolute h-10 w-10 block pt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="auto" viewBox="0 0 20.042 20">
                                <path id="Path_10931" data-name="Path 10931" d="M1609.89,662.325c.893.87,1.772,1.727,2.65,2.585.621.607,1.238,1.218,1.859,1.824.55.536,1.169.6,1.6.16.455-.457.395-1.038-.171-1.593-1.5-1.469-3-2.936-4.515-4.425a8.454,8.454,0,0,0,1.438-7.51,8.374,8.374,0,0,0-14.468-3.188,8.485,8.485,0,0,0,.26,11.291A8.246,8.246,0,0,0,1609.89,662.325Zm-5.347-.156a6.491,6.491,0,1,1,6.5-6.425A6.473,6.473,0,0,1,1604.543,662.169Z" transform="translate(-1596.261 -647.183)" fill="#9b9b9b" />
                            </svg>
                        </div>
                        <Input
                            inputType='text'
                            placeholder='Tìm kiếm'
                            icon='icons'
                        />
                    </div>
                </div>
                <div className="filter flex justify-between items-start">
                    <div className="select-filter inline-block">
                        <p className='text-xs inline'>Bộ lọc</p>
                        <select name='select-filter' defaultValue='Mới nhất' className='text-gray-800 font-bold text-sm bg-white'>
                            <option value="Mới nhất">Mới nhất</option>
                            <option value="Xem nhiều nhất">Xem nhiều nhất</option>
                        </select>
                    </div>
                    <div className="style-view inline">
                        <div className="icon-view flex flex-row space-x-4 justify-end">
                            <div className={"icon-grid-view w-5 h-5 hover:text-primary-600  cursor-pointer " + (View == 0 && "text-primary-600")} onClick={() => { handleView(0) }}>
                                <i className={"duration-100 w-4 h-4 "}>
                                    <svg id="Group_38744" data-name="Group 38744" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 20.006 20" className="fill-current">
                                        <path id="Path_10927" data-name="Path 10927" d="M1551.2,571c-.724,0-1.449.009-2.173,0a2.148,2.148,0,0,1-2.131-2.141q-.018-2.192,0-4.384a2.083,2.083,0,0,1,1.959-2.1c1.573-.053,3.151-.05,4.724,0a2.031,2.031,0,0,1,1.942,1.95c.049,1.561.052,3.126,0,4.686a2.094,2.094,0,0,1-2.113,1.99C1552.676,571.008,1551.939,571,1551.2,571Z" transform="translate(-1546.889 -551.003)" />
                                        <path id="Path_10928" data-name="Path 10928" d="M1657.364,571c-.724,0-1.449.009-2.173,0a2.148,2.148,0,0,1-2.131-2.141q-.018-2.192,0-4.384a2.083,2.083,0,0,1,1.959-2.1c1.573-.053,3.151-.05,4.724,0a2.031,2.031,0,0,1,1.942,1.95c.049,1.561.052,3.126,0,4.686a2.094,2.094,0,0,1-2.112,1.99C1658.838,571.008,1658.1,571,1657.364,571Z" transform="translate(-1641.718 -551.003)" />
                                        <path id="Path_10929" data-name="Path 10929" d="M1551.225,456.2c.724,0,1.449-.008,2.173,0a2.1,2.1,0,0,1,2.128,1.973c.053,1.561.05,3.125,0,4.686a2.033,2.033,0,0,1-1.964,1.969c-1.561.048-3.125.051-4.686,0a2.093,2.093,0,0,1-1.977-2.124q-.017-2.173,0-4.345a2.144,2.144,0,0,1,2.152-2.157C1549.777,456.189,1550.5,456.2,1551.225,456.2Z" transform="translate(-1546.892 -456.194)" />
                                        <path id="Path_10930" data-name="Path 10930" d="M1657.413,456.2c.724,0,1.449-.009,2.173,0a2.145,2.145,0,0,1,2.137,2.135q.02,2.192,0,4.384a2.088,2.088,0,0,1-1.991,2.11c-1.561.051-3.125.048-4.686,0a2.034,2.034,0,0,1-1.947-1.945c-.048-1.573-.051-3.151,0-4.724a2.09,2.09,0,0,1,2.1-1.957C1655.939,456.188,1656.676,456.2,1657.413,456.2Z" transform="translate(-1641.726 -456.194)" />
                                    </svg>
                                </i >
                            </div>
                            <div className={"icon-grid-view w-5 h-5 hover:text-primary-600  cursor-pointer " + (View == 1 && "text-primary-600")} onClick={() => { handleView(1) }}>
                                <i className={"duration-100 sidebar-menu-item-collapse w-4 h-4 "}>
                                    <svg id="Group_38743" data-name="Group 38743" xmlns="http://www.w3.org/2000/svg" width="110%" height="110%" viewBox="0 0 26.391 20" className="fill-current">
                                        <path id="Path_10921" data-name="Path 10921" d="M2045.856,623.9c-2.387,0-4.774.007-7.162,0a1.816,1.816,0,0,1-1.786-2.439,1.792,1.792,0,0,1,1.66-1.183q7.327-.011,14.653,0a1.81,1.81,0,1,1-.062,3.619C2050.725,623.906,2048.291,623.9,2045.856,623.9Z" transform="translate(-2028.612 -604.802)" />
                                        <path id="Path_10922" data-name="Path 10922" d="M2046.053,469.365q-3.6,0-7.209,0a1.812,1.812,0,0,1-.128-3.622c.234-.017.471-.005.707-.005q6.879,0,13.759,0a1.816,1.816,0,1,1,.176,3.625C2050.922,469.369,2048.488,469.365,2046.053,469.365Z" transform="translate(-2028.784 -464.834)" />
                                        <path id="Path_10923" data-name="Path 10923" d="M2046.025,546.748q-3.58,0-7.16,0a1.761,1.761,0,0,1-1.889-1.826,1.784,1.784,0,0,1,1.9-1.777q7.207,0,14.415,0a1.8,1.8,0,1,1-.008,3.6Q2049.653,546.751,2046.025,546.748Z" transform="translate(-2028.779 -534.945)" />
                                        <path id="Path_10924" data-name="Path 10924" d="M1950.016,535.97a2.724,2.724,0,0,1,2.721-2.672,2.732,2.732,0,1,1-.02,5.463A2.725,2.725,0,0,1,1950.016,535.97Z" transform="translate(-1950.016 -526.03)" />
                                        <path id="Path_10925" data-name="Path 10925" d="M1952.705,615.914a2.7,2.7,0,0,1-2.69-2.788,2.731,2.731,0,1,1,2.69,2.788Z" transform="translate(-1950.015 -595.914)" />
                                        <path id="Path_10926" data-name="Path 10926" d="M1952.728,456.194a2.719,2.719,0,0,1,2.749,2.743,2.731,2.731,0,1,1-5.462-.078A2.688,2.688,0,0,1,1952.728,456.194Z" transform="translate(-1950.015 -456.194)" />
                                    </svg>
                                </i >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
}