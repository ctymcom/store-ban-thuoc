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
                                    <div className="input-id">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Mã Nhân viên</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                value='D6SAF2A6SC2Z3'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-username">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Tên đăng nhập</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                placeholder='Tên đăng nhập'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-firstname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Họ</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                value='Nguyễn'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-lastname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Tên</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                value='An'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-middlename">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Tên đệm</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                value='Trường'
                                            />
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
                                    <p className='text-sm text-gray-400'>Thông tin tài khoản</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="input-id">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Chức vụ</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                value='D6SAF2A6SC2Z3'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-username">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Vai trò</p>
                                        </div>
                                        <div className="input">
                                            <SelectBox
                                                options={['Admin', 'Manager']}
                                                style=''
                                            />
                                        </div>
                                    </div>
                                    <div className="input-firstname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Trạng thái</p>
                                        </div>
                                        <div className="input">
                                            <SelectBox
                                                options={['Đang hoạt động', 'Dừng hoạt động']}
                                                style=' text-green-600'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-lastname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Tài khoản quản lí</p>
                                        </div>
                                        <div className="input">
                                            <SelectBox
                                                options={['Tài khoản quản lí', '']}
                                                style=' '
                                            />
                                        </div>
                                    </div>
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
                                    <div className="input-id">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Email</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='email'
                                                placeholder='abc@gmail.com'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-username">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Số điện thoại</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='number'
                                                placeholder='Số điện thoại'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-firstname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Ngày sinh</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                value='12/02/2012'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-lastname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Giới tính</p>
                                        </div>
                                        <div className="input">
                                            <SelectBox
                                                options={['Nam', 'Nữ', 'Khác']}
                                                style=' '
                                            />
                                        </div>
                                    </div>
                                    <div className="input-middlename">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Địa chỉ</p>
                                        </div>
                                        <div className="input">
                                            <Input
                                                inputType='text'
                                                value='294 Nguyễn Thị Thập'
                                            />
                                        </div>
                                    </div>
                                    <div className="input-lastname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Tỉnh/Thành</p>
                                        </div>
                                        <div className="input">
                                            <SelectBox
                                                options={['TP Hồ Chí Minh', 'Hà Nội', 'Cần Thơ']}
                                                style=' '
                                            />
                                        </div>
                                    </div>
                                    <div className="input-lastname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Quận/Huyện</p>
                                        </div>
                                        <div className="input">
                                            <SelectBox
                                                options={['Quận Tân Bình', 'Quận Bình Tân', 'Huyện Củ Chi']}
                                                style=' '
                                            />
                                        </div>
                                    </div>
                                    <div className="input-lastname">
                                        <div className="py-1">
                                            <p className='uppercase font-bold text-sm'>Phường/Xã</p>
                                        </div>
                                        <div className="input">
                                            <SelectBox
                                                options={['Phường 1', 'Phường 7', 'Phường 10']}
                                                style=' '
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full">
                            <div className="flex justify-end items-center">
                                <div className="text-sm delete-account text-secondary-500  py-2 px-3">
                                    <Link href='/'>Xóa tài khoản</Link>
                                </div>
                                <div className="transition text-sm uppercase py-3 px-4 border-2 rounded-md text-gray-600 hover:bg-primary-600 hover:text-white ">
                                    <Link href='/'>Lưu thay đổi</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}