import React from 'react';
import { AddressList } from './address-list';
import { listAdress } from './address-data';
import { useState } from 'react';
import AddressCreateDialog from './address-create-dialog';
import { Dialog } from '../../../shared/utilities/dialog/dialog';
export default function AddressDialog() {
    const [ListAddr, setListAddr] = useState([...listAdress]);
    const [showDialog, setShowDialog] = useState(false);
    return (
        <div className=" pb-10 text-20">
            {/* <Path listPath={listPath} /> */}
            <div className="py-6">
                <h3 className="uppercase py-2">Địa chỉ giao hàng</h3>
                <button className="btn-primary font-normal px-20" onClick={()=>{setShowDialog(true)}}>Tạo địa chỉ mới</button>
            </div>
            <h3 className="uppercase py-2">Danh sách địa chỉ</h3>
            <AddressList ListAddr={ListAddr} />
            <Dialog width="420px" isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                title="Tạo Địa Chỉ Mới">
                <Dialog.Body>
                    <AddressCreateDialog setShowDialog={setShowDialog}/>
                </Dialog.Body>
            </Dialog>
        </div>
    );
}
