import { Checkbox } from '../../../shared/form/checkbox';
import Dropdown from './dropdown';
import { useState } from 'react';
import { type } from 'os';
import Gender from './gender';
export function FormProfile(props) {
    const [user,setUser] = useState(props.user)
    const handleChange=(value)=>{
        console.log(value);
    }
    return <>
        <h3 className="uppercase border-gray-200 border-b-2 pb-2">Thông tin tài khoản</h3>
        <div className="grid grid-cols-3 pt-2 ">
            <div className="col-span-2 grid grid-cols-4 gap-2 pr-16 border-r border-gray-200 items-center">
                <p className="col-span-1">Họ và tên</p>
                <input className="input-profile" type="text" value={user.name} onChange={(e)=>{setUser(e.target.value)}}/>
                <p className="col-span-1">Số điện thoại</p>
                <input className="input-profile" type="text" value={user.phoneNumber} onChange={(e)=>{setUser(e.target.value)}}/>
                <p className="col-span-1">Email</p>
                <input className="input-profile" type="text" value={user.email} onChange={(e)=>{setUser(e.target.value)}}/>
                <div className="col-span-4 grid grid-cols-4">
                    <Gender gender={user.gender}/>
                </div>
                <p className="col-span-1">Ngày sinh</p>
                <div className="col-span-3 flex space-x-2">
                    <Dropdown name={"day"} id={"day"} dateOfBirth={user.dateOfBirth} setDateOfBirth={handleChange}/>
                    <Dropdown name={"month"} id={"month"} dateOfBirth={user.dateOfBirth} setDateOfBirth={handleChange}/>
                    <Dropdown name={"year"} id={"year"} dateOfBirth={user.dateOfBirth} setDateOfBirth={handleChange}/>
                    </div>
                <p className="col-span-1">Mật khẩu</p>
                <button className="col-span-3 btn-outline border-primary text-primary">Đổi mật khẩu</button>
            </div>
            <div className="col-span-1 text-center">
                <div className="my-10 mx-16">
                    <img src="public/assets/images/avatar.png" alt="" />
                </div>
                <button className="btn-outline border-primary-light border-2 px-16 font-normal text-primary">Đổi ảnh</button>
                <p className="text-12 text-gray-300">Dung lượng file tối đa 1MB</p>
                <p className="text-12 text-gray-300">Định dạng: .JPEG, .PNG</p>
            </div>
            <div className="col-span-2 grid grid-cols-4 mt-20 pr-16">
                <div className="col-span-1"></div>
                <button className="btn-primary font-normal col-span-3">Cập Nhật</button>
            </div>
        </div>
    </>
}