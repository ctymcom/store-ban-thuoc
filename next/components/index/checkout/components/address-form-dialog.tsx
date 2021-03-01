import React from 'react';
import { useState } from 'react';
import Dropdown from '../../profile-user/components/dropdown';
import CheckBoxSquare from './check-box-square';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
import { useAddressContext } from '../providers/address-provider';
interface PropsType extends ReactProps{
  setShowDialog:Function,
  isOpen:boolean,
}
const AddressCreateDialog = (props:PropsType) => {
  const {addressEdit, handleChange, setAddressEdit, setShowDialogCreateAddress} = useAddressContext();
  return (
    <Dialog width="420px" isOpen={props.isOpen} mobileMode={false}
                onClose={() => props.setShowDialog(false)}
                title="Tạo Địa Chỉ Mới">
                <Dialog.Body>
                  <div className="flex flex-wrap gap-4 py-4 text-16 sm:text-20">
                    <input className="form-input w-full h-12 text-16 sm:text-20" defaultValue={addressEdit?addressEdit.name:"Họ và tên"} onChange={(e)=>{setAddressEdit({...addressEdit,name:e.target.value})}}/>
                    <input className="form-input w-full h-12 text-16 sm:text-20" defaultValue={addressEdit?addressEdit.numberPhone:"Số điện thoại"} onChange={(e)=>{(e.target.value).length<=10?setAddressEdit({...addressEdit,numberPhone:e.target.value}):false}}/>
                    <Dropdown listOptions={["Chọn Tỉnh/Thành phố"]} defaultValue={"Chọn Tỉnh/Thành phố"}/>
                    <Dropdown listOptions={["Chọn Huyện/Quận"]} defaultValue={"Chọn Huyện/Quận"}/>
                    <Dropdown listOptions={["Chọn Xã/Phường"]} defaultValue={"Chọn Xã/Phường"}/>
                    <input className="form-input w-full h-12 text-16 sm:text-20" defaultValue={addressEdit?addressEdit.address:"Nhập địa chỉ, tên đường, tòa nhà..."}/>
                    <div className="w-full h-12 flex items-center gap-2 cursor-pointer" onClick={()=>{setAddressEdit({...addressEdit,default:!addressEdit.default})}}>
                      <CheckBoxSquare checked={addressEdit?addressEdit.default:true} /> Chọn làm địa chỉ mặc định
                      </div>
                    <button className="btn-primary w-full h-12 text-16 sm:text-20" onClick={()=>{setShowDialogCreateAddress(false);handleChange(null,"edit")}}>Xác nhận</button>
                  </div>
                </Dialog.Body>
            </Dialog>
  );
}
export default AddressCreateDialog;
