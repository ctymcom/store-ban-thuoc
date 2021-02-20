import React from 'react';
import { ListAddress } from './component/list-address';
import { listAdress, listPath } from './component/address-data';
import { useState } from 'react';
import { Path } from './component/path';
export default function AddressPage() {
    const [ListAddr, setListAddr] = useState([...listAdress]);
    return (
        <div className="main-container pb-10">
            {/* <Path listPath={listPath} /> */}
            <div className="py-6">
                <h3 className="uppercase py-2">Địa chỉ giao hàng</h3>
                <button className="btn-primary font-normal px-20">Tạo địa chỉ mới</button>
            </div>
            <h3 className="uppercase py-2">Danh sách địa chỉ</h3>
            <ListAddress ListAddr={ListAddr} />
        </div>
    );
}
