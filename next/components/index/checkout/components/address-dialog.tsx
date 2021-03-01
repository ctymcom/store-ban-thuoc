import React from 'react';
import { AddressList } from './address-list';
import { useState } from 'react';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
import { BiMap } from 'react-icons/bi';
import AddressCreateDialog from './address-create-dialog';
import { useAddressContext } from '../providers/address-provider';
interface PropsType extends ReactProps{
    setShowDialog:Function,
    isOpen:boolean,
  }
export default function AddressDialog(props:PropsType) {
    const {showDialogCreateAddress,setShowDialogCreateAddress} = useAddressContext()
    return (
        <Dialog width="420px" isOpen={props.isOpen}
            onClose={() => props.setShowDialog(false)}
            title="Danh sách địa chỉ"
            icon={<BiMap/>}>
                <div className=" pb-10 text-20 text-gray-800 justify-around flex-wrap flex" >
                    <button className="btn-primary font-normal py-6 my-4 w-11/12" onClick={()=>{setShowDialogCreateAddress(true)}}>Tạo địa chỉ mới</button>
                    <AddressList/>
                </div>
            <AddressCreateDialog isOpen={showDialogCreateAddress} setShowDialog={setShowDialogCreateAddress}/>
        </Dialog>
    );
}
