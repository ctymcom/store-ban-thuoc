import React from 'react';
import { useState } from 'react';
import Dropdown from '../../profile-user/components/dropdown';
import CheckBoxSquare from './check-box-square';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
import { useAddressContext } from '../providers/address-provider';
import { Select } from '../../../shared/utilities/form/select';
interface PropsType extends ReactProps{
  setShowDialog:Function,
  isOpen:boolean,
  title?:string
}
const AddressFormDialog = (props:PropsType) => {
  const {addressEdit, handleChange, setAddressEdit, setShowAddressFormDialog, provinces, province, setProvince ,districts, district, setDistrict, wards, ward, setWard } = useAddressContext();
  return (
    <Dialog width="420px" isOpen={props.isOpen} mobileMode={false}
                onClose={() => props.setShowDialog(false)}
                title={props.title?props.title:"Chỉnh sửa địa chỉ"}>
                <Dialog.Body>
                  <div className="flex flex-wrap gap-4 py-4 text-16">
                    <input className="form-input w-full h-12 text-16" defaultValue={addressEdit?addressEdit.name:"Họ và tên"} onChange={(e)=>{setAddressEdit({...addressEdit,name:e.target.value})}}/>
                    <input className="form-input w-full h-12 text-16" defaultValue={addressEdit?addressEdit.numberPhone:"Số điện thoại"} onChange={(e)=>{(e.target.value).length<=10?setAddressEdit({...addressEdit,numberPhone:e.target.value}):false}}/>
                    <Select className={`w-full h-12 text-16`} options={provinces} value={province} onChange={(val)=>{setProvince(val);}}/>
                    <Select disabled={province?false:true} className={`w-full h-12 text-16 ${provinces?"disabled:pointer-events-none disabled:cursor-not-allowed":""}`} options={districts} value={district} onChange={(val)=>setDistrict(val)}/>
                    <Select disabled={district?false:true} className={`w-full h-12 text-16 ${wards?"disabled:pointer-events-none disabled:cursor-not-allowed":""}`} options={wards} value={ward} onChange={(val)=>setWard(val)}/>
                    <input className="form-input w-full h-12 text-16" defaultValue={addressEdit?addressEdit.address:"Nhập địa chỉ, tên đường, tòa nhà..."}/>
                    <div className="w-full h-12 flex items-center gap-2 cursor-pointer" onClick={()=>{setAddressEdit({...addressEdit,default:!addressEdit.default})}}>
                      <CheckBoxSquare checked={addressEdit?addressEdit.default:true} /> Chọn làm địa chỉ mặc định
                      </div>
                    <button className="btn-primary w-full h-12 text-16" onClick={()=>{setShowAddressFormDialog(false);addressEdit?handleChange(addressEdit.id,"edit"):handleChange(addressEdit.id,"add")}}>Xác nhận</button>
                  </div>
                </Dialog.Body>
            </Dialog>
  );
}
export default AddressFormDialog;
