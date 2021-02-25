import React from 'react';
import CheckBoxCricle from '../../cart/components/check-box-circle';
import { MyAddress } from './address-data';
interface Proptype extends ReactProps{
    address:MyAddress,
    onClick:Function
}

export function AddressItem(props:Proptype) {
    return (
        <div className="border-b-2 text-16 sm:text-20 py-2 leading-7" >
            <div className="flex items-center gap-1">
                <CheckBoxCricle checked={true}/>
                <div className="">
                    <p className="font-semibold whitespace-nowrap">{props.address.name} - {props.address.numberPhone}</p>
                    <p>{props.address.address}</p>
                </div>
            </div>
            <div className="flex whitespace-nowrap text-gray-500 my-2">
                {
                    props.address.default ? <p className="text-primary text-center px-4">[Mặc định]</p> : <button className="btn-outline rounded-lg">Đặt mặc định</button>
                }
                <button className="ml-auto">Chỉnh sửa</button>
                <button className="ml-3">Xóa</button>
            </div>
        </div >
    );
}
