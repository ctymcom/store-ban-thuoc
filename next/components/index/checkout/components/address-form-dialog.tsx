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
  const {userAddress, handleChange, setUserAddress, provinces, districts, wards } = useAddressContext();
  const handleOnChangSelect=(value:string,id:string)=>{
    if(userAddress[id]!==value){
      switch (id) {
        case "provinceId":{
          setUserAddress({...userAddress,[id]:value,districtId:"",wardId:""})
        }
        break;
        case "districtId":{
          setUserAddress({...userAddress,[id]:value,wardId:""})
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
                    <input className="form-input w-full h-12 text-16" defaultValue={userAddress?.contactName}
                            placeholder="Họ và tên" 
                            onChange={(e)=>{setUserAddress({...userAddress,contactName:e.target.value})}}/>
                    <input className="form-input w-full h-12 text-16" defaultValue={userAddress?.phone}
                            placeholder="Số điện thoại" 
                            onChange={(e)=>{setUserAddress({...userAddress,phone:e.target.value})}}/>
                    <Select className={`w-full h-12 text-16`} options={provinces} 
                            value={userAddress?userAddress.provinceId:""} 
                            onChange={e=>{handleOnChangSelect(e,"provinceId")}}/>
                    <Select disabled={!userAddress||userAddress.provinceId===""?true:false} 
                            className={`w-full h-12 text-16`} options={districts} 
                            value={userAddress?userAddress.districtId:""} 
                            onChange={e=>{handleOnChangSelect(e,"districtId")}}/>
                    <Select disabled={userAddress&&userAddress.districtId!==""&&userAddress.provinceId!==""?false:true} 
                            className={`w-full h-12 text-16`} options={wards} 
                            value={userAddress?userAddress.wardId:""} 
                            onChange={e=>{setUserAddress({...userAddress,wardId:e})}}/>
                    <input className="form-input w-full h-12 text-16" defaultValue={userAddress?.address}
                            placeholder="Nhập địa chỉ, tên đường, tòa nhà..." 
                            onChange={(e)=>{setUserAddress({...userAddress,address:e.target.value})}}/>
                    <div className="w-full h-12 flex items-center gap-2 cursor-pointer" onClick={()=>{setUserAddress({...userAddress,isDefault:!userAddress.isDefault})}}>
                      <CheckBoxSquare checked={userAddress?userAddress.isDefault:true} /> Chọn làm địa chỉ mặc định
                      </div>
                    <button className="btn-primary w-full h-12 text-16" onClick={()=>{props.setShowAddressFormDialog(false);handleChange(userAddress.id,"formAddress")}}>Xác nhận</button>
                  </div>
                </Dialog.Body>
            </Dialog>
  );
}
export default AddressFormDialog;
