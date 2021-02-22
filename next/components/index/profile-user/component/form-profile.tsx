import { Checkbox } from '../../../shared/form/checkbox';
import { HiChevronDown } from 'react-icons/hi';
export function FormProfile() {
    return <>
        <h3 className="uppercase border-gray-200 border-b-2 pb-2">Thông tin tài khoản</h3>
        <div className="grid grid-cols-3 pt-2 ">
            <div className="col-span-2 grid grid-cols-4 gap-2 pr-16 border-r border-gray-200 items-center">
                <p className="col-span-1">Họ và tên</p>
                <input className="input-profile w-10/12" type="text" value="Nguyễn Văn A" />
                <p className="col-span-1">Số điện thoại</p>
                <input className="input-profile w-10/12" type="text" value="0909 666 333" />
                <p className="col-span-1">Email</p>
                <input className="input-profile w-10/12" type="text" value="nguyenvana@gmail.com" />
                <div className="col-span-4 grid grid-cols-3 w-10/12">
                    <p className="col-span-1">Giới tính</p>
                    <div className="flex items-center">
                        <Checkbox />
                        <p>Nam</p>
                    </div>
                    <div className="flex items-center">
                        <Checkbox />
                        <p>Nữ</p>
                    </div>
                </div>
                <p className="col-span-1">Ngày sinh</p>
                <div className="col-span-3 flex space-x-2 w-10/12">
                    <div className="flex-grow input-profile cursor-pointer flex items-center justify-evenly">Ngày <i><HiChevronDown /></i></div>
                    <div className="flex-grow input-profile cursor-pointer flex items-center justify-evenly">Tháng <i><HiChevronDown /></i></div>
                    <div className="flex-grow input-profile cursor-pointer flex items-center justify-evenly">Năm <i><HiChevronDown /></i></div>
                </div>
                <p className="col-span-1">Mật khẩu</p>
                <button className="col-span-3 btn-outline w-10/12 border-primary text-primary">Đổi mật khẩu</button>
            </div>
            <div className="col-span-1 text-center">
                <div className="my-10 mx-16 flex justify-center items-center">
                    <img src="assets/svg/" alt="" />
                </div>
                <button className="btn-outline border-primary-light border-2 px-16 font-normal text-primary">Đổi ảnh</button>
                <p className="text-12 text-gray-400">Dung lượng file tối đa 1MB</p>
                <p className="text-12 text-gray-400">Định dạng: .JPEG, .PNG</p>
            </div>
            <div className="col-span-2 grid grid-cols-4 mt-20 pr-16">
                <div className="col-span-1"></div>
                <button className="btn-primary font-normal col-span-3 w-10/12">Cập Nhật</button>
            </div>
        </div>
    </>
}