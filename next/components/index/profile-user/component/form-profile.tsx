import Gender from './gender';
import DateTime from './datetime';
import { useState } from 'react';
type PropsType ={
    user:{name:string,phoneNumber:string,email:string,gender:string,dateOfBirth:Date},
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
    return <>
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
                <div className="my-10 mx-16">
                    <img src="/assets/img/avatar.svg" alt="" />
                </div>
                <button className="btn-outline border-primary-light border-2 text-sm md:text-base px-6 md:px-16 font-normal text-primary">Đổi ảnh</button>
                <p className="text-12 text-gray-400">Dung lượng file tối đa 1MB</p>
                <p className="text-12 text-gray-400">Định dạng: .JPEG, .PNG</p>
            </div>
            <div className="col-span-2 grid grid-cols-1 md:grid-cols-4 mt-6 md:mt-20 pr-0 md:pr-16">
                <button className="btn-primary font-normal col-span-4 w-6/12 md:w-8/12 m-auto md:ml-28 text-sm md:text-base">Cập Nhật</button>
            </div>
        </div>
    </>
}