import React from 'react';
import { AddressList } from './address-list';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
import { BiMap } from 'react-icons/bi';
import { useAddressContext, AddressProvider } from '../providers/address-provider';
import AddressFormDialog from './address-form-dialog';
import { useState } from 'react';
interface PropsType extends ReactProps{
    setShowDialog:Function,
    isOpen:boolean,
}

export default function AddressDialog(props:PropsType) {
    const [showAddressFormDialog, setShowAddressFormDialog] = useState<boolean>(false);
    return (
        <Dialog width="420px" isOpen={props.isOpen}
        onClose={() => props.setShowDialog(false)}
        title="Danh sách địa chỉ"
        icon={<BiMap/>}>
            <AddressProvider>
                    <div className=" pb-10 text-20 text-gray-800 justify-around flex flex-wrap" >
                        <button className="btn-primary font-normal py-6 my-4 w-11/12" onClick={()=>{setShowAddressFormDialog(true)}}>Tạo địa chỉ mới</button>
                        <AddressList showAddressFormDialog={showAddressFormDialog} setShowAddressFormDialog={setShowAddressFormDialog}/>
                    </div>
                <AddressFormDialog isOpen={showAddressFormDialog} setShowAddressFormDialog={setShowAddressFormDialog}/>
            </AddressProvider>
        </Dialog>
    );
}
