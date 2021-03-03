import React from 'react';
import { useState } from 'react';
import Dropdown from '../../profile-user/components/dropdown';
import CheckBoxSquare from './check-box-square';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
import { useAddressContext } from '../providers/address-provider';
import { Select } from '../../../shared/utilities/form/select';
import { PropsTypeFormDialog } from './address-list';
interface PropsType extends PropsTypeFormDialog{
  isOpen:boolean,
  title?:string
}
const AddressFormDialog = (props:PropsType) => {
  const {addressEdit, handleChange, setAddressEdit, provinces, districts, wards } = useAddressContext();
  const handleOnChangSelect=(value:string,id:string)=>{
    if(addressEdit[id]!==value){
      switch (id) {
        case "provinceId":{
          setAddressEdit({...addressEdit,[id]:value,districtId:"",wardId:""})
        }
        break;
        case "districtId":{
          setAddressEdit({...addressEdit,[id]:value,wardId:""})
        }
        break;
        default:
          break;
        }
      }
  }
  return (
    <Dialog width="420px" isOpen={props.isOpen} mobileMode={false}
                onClose={() => props.setShowAddressFormDialog(false)}
                title={props.title?props.title:"Chỉnh sửa địa chỉ"}>
                <Dialog.Body>
                  <div className="flex flex-wrap gap-4 py-4 text-16">
                    <input className="form-input w-full h-12 text-16" value={addressEdit?addressEdit.contactName:"Họ và tên"} 
                            onChange={(e)=>{setAddressEdit({...addressEdit,contactName:e.target.value})}}/>
                    <input className="form-input w-full h-12 text-16" value={addressEdit?addressEdit.phone:"Số điện thoại"} 
                            onChange={(e)=>{setAddressEdit({...addressEdit,phone:e.target.value})}}/>
                    <Select className={`w-full h-12 text-16`} options={provinces} 
                            value={addressEdit?addressEdit.provinceId:""} 
                            onChange={e=>{handleOnChangSelect(e,"provinceId")}}/>
                    <Select disabled={!addressEdit||addressEdit.provinceId===""?true:false} 
                            className={`w-full h-12 text-16`} options={districts} 
                            value={addressEdit?addressEdit.districtId:""} 
                            onChange={e=>{handleOnChangSelect(e,"districtId")}}/>
                    <Select disabled={addressEdit&&addressEdit.districtId!==""&&addressEdit.provinceId!==""?false:true} 
                            className={`w-full h-12 text-16`} options={wards} 
                            value={addressEdit?addressEdit.wardId:""} 
                            onChange={e=>{setAddressEdit({...addressEdit,wardId:e})}}/>
                    <input className="form-input w-full h-12 text-16" defaultValue={addressEdit?addressEdit.address:"Nhập địa chỉ, tên đường, tòa nhà..."}/>
                    <div className="w-full h-12 flex items-center gap-2 cursor-pointer" onClick={()=>{setAddressEdit({...addressEdit,isDefault:!addressEdit.isDefault})}}>
                      <CheckBoxSquare checked={addressEdit?addressEdit.isDefault:true} /> Chọn làm địa chỉ mặc định
                      </div>
                    <button className="btn-primary w-full h-12 text-16" onClick={()=>{props.setShowAddressFormDialog(false);handleChange(addressEdit.id,"edit")}}>Xác nhận</button>
                  </div>
                </Dialog.Body>
            </Dialog>
  );
}
export default AddressFormDialog;
