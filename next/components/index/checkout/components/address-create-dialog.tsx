import React from 'react';
import { useState } from 'react';
import Dropdown from '../../profile-user/components/dropdown';
import CheckBoxSquare from './check-box-square';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
interface PropsType extends ReactProps{
  setShowDialog:Function,
  isOpen:boolean,
}
const AddressCreateDialog = (props:PropsType) => {
  const [defaultAdrress, setDefaultAdrress] = useState(true);
  return (
    <Dialog width="420px" isOpen={props.isOpen}
                onClose={() => props.setShowDialog(false)}
                title="Tạo Địa Chỉ Mới">
                <Dialog.Body>
                  <div className="flex flex-wrap gap-4 py-4 text-20">
                    <input className="form-input w-full h-12 text-20" placeholder="Họ và tên"/>
                    <input className="form-input w-full h-12 text-20" placeholder="Số điện thoại"/>
                    <Dropdown listOptions={["Chọn Tỉnh/Thành phố"]} defaultValue={"Chọn Tỉnh/Thành phố"}/>
                    <Dropdown listOptions={["Chọn Huyện/Quận"]} defaultValue={"Chọn Huyện/Quận"}/>
                    <Dropdown listOptions={["Chọn Xã/Phường"]} defaultValue={"Chọn Xã/Phường"}/>
                    <input className="form-input w-full h-12 text-20" placeholder="Nhập địa chỉ, tên đường, tòa nhà..."/>
                    <div className="w-full h-12 flex items-center gap-2 cursor-pointer" onClick={()=>{setDefaultAdrress(!defaultAdrress)}}>
                      <CheckBoxSquare checked={defaultAdrress}/> Chọn làm địa chỉ mặt định
                      </div>
                    <button className="btn-primary w-full h-12 text-20" onClick={()=>{}}>Xác nhận</button>
                  </div>
                </Dialog.Body>
            </Dialog>
  );
}
export default AddressCreateDialog;
