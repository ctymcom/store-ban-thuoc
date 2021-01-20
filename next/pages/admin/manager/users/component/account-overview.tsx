import { Input } from "../../../../../components/shared/form/input"
import { SelectBox } from "../../../../../components/shared/form/select-box"
import Link from 'next/link'
export function AccountOverview(props) {
    const { User } = props

    return (
        <>
            <div className="w-full py-3">
                <div className="container">
                    <div className="information-account">
                        <div className="header-avt-name flex items-start space-x-4">
                            <div className="avt">
                                <img src="https://ss-images.catscdn.vn/2019/05/02/5086417/58673861_2082849575345662_5550445563004059648_n.jpg" alt={User.name} className='rounded-lg w-24' />
                            </div>
                            <div className="infor">
                                <div className="name">
                                    <p>{User.name}</p>
                                </div>
                                <div className="text-gray-400 text-xs py-1">
                                    <p>Ngày tạo: {User.date_create}</p>
                                </div>
                                <div className="flex justify-statrt space-x-3 py-1">
                                    <div className="btn-change-avt">
                                        <div className="transition py-2 px-3 text-sm bg-primary-500 text-white rounded-md cursor-pointer hover:bg-primary-600">
                                            Đổi avatar
                                        </div>
                                    </div>
                                    <div className="btn-change-password ">
                                        <div className="transition py-2 px-3 text-sm bg-secondary-400 cursor-pointer text-gray-800 rounded-md hover:bg-secondary-500">
                                            Đổi mật khẩu
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full pt-8">
                        <div className="pb-8 border-b border-gray-300">
                            <div className="container">
                                <div className="py-2">
                                    <p className='text-sm text-gray-400'>Thông tin cơ bản</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        inputType='text'
                                        value='D6SAF2A6SC2Z3'
                                        label="Mã nhân viên"
                                    />
                                    <Input
                                        inputType='text'
                                        placeholder='Tên đăng nhập'
                                        label="Tên đăng nhập"
                                    />
                                    <Input
                                        inputType='text'
                                        placeholder='Nguyễn'
                                        label="Họ"
                                    />

                                    <Input
                                        inputType='text'
                                        value='An'
                                        label='Tên'
                                    />

                                    <Input
                                        inputType='text'
                                        value='Trường'
                                        label='Tên đệm'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full pt-8">
                        <div className="pb-8 border-b border-gray-300">
                            <div className="container">
                                <div className="py-2">
                                    <p className='text-sm text-gray-400'>Thông tin tài khoản</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        inputType='text'
                                        value='D6SAF2A6SC2Z3'
                                        label='Chức vụ'
                                    />
                                    <SelectBox
                                        options={['Admin', 'User']}
                                        style=''
                                        label='Vai trò'
                                    />
                                    <SelectBox
                                        options={['Đang hoạt động', 'Dừng hoạt động']}
                                        style=' text-green-600'
                                        label='Trạng thái'
                                    />
                                    <SelectBox
                                        options={['Tài khoản quản lí', '']}
                                        style=' '
                                        label='Tài khoản quản lí'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full pt-8">
                        <div className="pb-8">
                            <div className="container">
                                <div className="py-2">
                                    <p className='text-sm text-gray-400'>Chi tiết tài khoản</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        inputType='email'
                                        placeholder='abc@gmail.com'
                                        label='Email'
                                    />
                                    <Input
                                        inputType='number'
                                        placeholder='Số điện thoại'
                                        label='Số điện thoại'
                                    />
                                    <Input
                                        inputType='text'
                                        value='12/02/2012'
                                        label='Ngày sinh'
                                    />
                                    <SelectBox
                                        options={['Nam', 'Nữ', 'Khác']}
                                        style=' '
                                        label='Giới tính'
                                    />
                                    <Input
                                        inputType='text'
                                        value='294 Nguyễn Thị Thập'
                                        label='Địa chỉ'
                                    />
                                    <SelectBox
                                        options={['TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ']}
                                        style=' '
                                        label='Tỉnh/Thành'
                                    />
                                    <SelectBox
                                        options={['Quận Tân Bình', 'Quận Bình Tân', 'Huyện Củ Chi']}
                                        style=' '
                                        label='Quận/Huyện'
                                    />
                                    <SelectBox
                                        options={['Phường 1', 'Phường 7', 'Phường 10']}
                                        style=' '
                                        label='Phường/Xã'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-end items-center">
                                <div className="cursor-pointer text-sm delete-account text-secondary-500  py-2 px-3">
                                    Xóa tài khoản
                                </div>
                                <div className="cursor-pointer transition text-sm uppercase py-3 px-4 border-2 rounded-md text-gray-600 hover:bg-primary-600 hover:text-white ">
                                    Lưu thay đổi
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}