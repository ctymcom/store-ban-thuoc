import React from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import CheckBoxCricle from '../../cart/components/check-box-circle';
import { useEffect, useState } from 'react';
import { useAddressContext } from '../providers/address-provider';
import { UserAddress } from '../../../../lib/repo/user-address.repo';
import { PropsTypeFormDialog } from './address-list';
import { useCheckoutContext } from '../providers/checkout-provider';
interface Proptype extends PropsTypeFormDialog{
    address:UserAddress,
}

export function AddressItem(props:Proptype) {
    const [address, setAddress] = useState(props.address);
    const {handleChange, setUserAddress} = useAddressContext();
    const {setAddressSelected,addressSelected} = useCheckoutContext();
    useEffect(() => {
        setAddress(props.address);
      }, [props.address]);
    return (
        <div className={address.id===addressSelected?.id?"border-b-2 text-16  leading-7 py-4 text-gray-600 bg-primary-light":"border-b-2 text-16  leading-7 py-4"} >
            <div className="flex items-center gap-1 cursor-pointer w-11/12 mx-auto" onClick={()=>{setAddressSelected(address)}}>
                <CheckBoxCricle checked={address.id===addressSelected?.id?true:false}/>
                <div className="">
                    <p className="font-semibold whitespace-nowrap">{address.contactName} - {address.phone}</p>
                    <p>{address.fullAddress}</p>
                </div>
            </div>
            <div className="flex items-center whitespace-nowrap text-gray-500 pt-2 w-11/12 mx-auto">
                {
                    address.isDefault ? <p className="text-primary text-center px-4">[Mặc định]</p>
                     : <button className="btn-outline rounded-lg text-16 "
                     onClick={()=>handleChange(address.id,"setDefault")}>Đặt mặc định</button>
                }
                <button className="ml-auto btn-default text-16  px-0" 
                        onClick={()=>{setUserAddress(address);props.setShowAddressFormDialog(true)}}><i className="p-1"><HiOutlinePencilAlt/></i>Chỉnh sửa</button>
                <button className="ml-3 btn-default hover:text-danger text-16  px-0" onClick={()=>handleChange(address.id,"delete")}><i className="p-1"><HiOutlineTrash/></i>Xóa</button>
            </div>
        </div >
    );
}
