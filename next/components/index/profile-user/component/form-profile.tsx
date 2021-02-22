import Gender from './gender';
import DateTime from './datetime';
import { useState } from 'react';
interface PropsType extends ReactProps {
    user: {
        name:string,
        phoneNumber:string,
        email:string,
        gender:string,
        dateOfBirth:Date
    },
}
export function FormProfile({user}: PropsType) {
    const [userP,setUserP] = useState(user);
    const handleChange=(id:string,value:any)=>{
        switch (id) {
            case "dateOfBirth":{
                setUserP({...userP,dateOfBirth:value});
            }
                break;
            case "name":{
                setUserP({...userP,name:value});
            }
            case "phoneNumber":{
                setUserP({...userP,phoneNumber:value});
            }
                break;  
            case "email":{
                setUserP({...userP,email:value});
            }
                break;
            case "gender":{
                setUserP({...userP,gender:value});
            }
                break;
        
            default:
                break;
        }
    }
    return <div className="w-3/4 mx-auto">
        <h3 className="uppercase border-gray-200 border-b-2 pb-2">Thông tin tài khoản</h3>
        <div className="grid grid-cols-3 pt-2 ">
            <div className="col-span-2 grid grid-cols-4 gap-2 pr-16 border-r border-gray-200 items-center">
                <p className="col-span-1">Họ và tên</p>
                <input className="input-profile" type="text" value={userP.name} onChange={(e)=>{handleChange("name",e.target.value)}}/>
                <p className="col-span-1">Số điện thoại</p>
                <input className="input-profile" type="text" value={userP.phoneNumber} onChange={(e)=>{handleChange("phoneNumber",e.target.value)}}/>
                <p className="col-span-1">Email</p>
                <input className="input-profile" type="text" value={userP.email} onChange={(e)=>{handleChange("email",e.target.value)}}/>
                <div className="col-span-4 grid grid-cols-4">
                    <Gender gender={userP.gender} handleChange={handleChange}/>
                </div>
                <p className="col-span-1">Ngày sinh</p>
                <div className="col-span-3 flex space-x-2">
                    <DateTime dateOfBirth={userP.dateOfBirth} handleChange={handleChange}/>
                    </div>
                <p className="col-span-1">Mật khẩu</p>
                <button className="col-span-3 btn-outline w-10/12 border-primary text-primary">Đổi mật khẩu</button>
            </div>
            <div className="col-span-1 text-center">
                <div className="p-4 mx-auto flex items-center justify-around">
                    <img src="public/assets/images/avatar.png" alt=""/>
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
    </div>
}