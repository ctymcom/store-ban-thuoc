import React from 'react';
import { AddressList } from './address-list';
import { listAdress } from './address-data';
import { useState } from 'react';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
import { BiMap } from 'react-icons/bi';
import AddressCreateDialog from './address-create-dialog';
interface PropsType extends ReactProps{
    setShowDialog:Function,
    isOpen:boolean,
  }
export default function AddressDialog(props:PropsType) {
    const [ListAddr, setListAddr] = useState([...listAdress]);
    const [showDialogCreateAddress, setShowDialogCreateAddress] = useState(false);
    return (
        <Dialog width="500px" isOpen={props.isOpen}
        onClose={() => props.setShowDialog(false)}
        title="Địa chỉ giao hàng"
        icon={<BiMap/>}>
        <Dialog.Body>
            <div className=" pb-10 text-20">
                <div className="py-6">
                    <h3 className="uppercase py-2">Địa chỉ giao hàng</h3>
                    <button className="btn-primary font-normal px-20" onClick={()=>{setShowDialogCreateAddress(true)}}>Tạo địa chỉ mới</button>
                </div>
                <h3 className="uppercase py-2">Danh sách địa chỉ</h3>
                <AddressList ListAddr={ListAddr} />
            </div>
        </Dialog.Body>
        <AddressCreateDialog isOpen={showDialogCreateAddress} setShowDialog={setShowDialogCreateAddress}/>
    </Dialog>
    );
}
