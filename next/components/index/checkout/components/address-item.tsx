import React from 'react';
import { HiOutlinePencilAlt, HiOutlineTrash } from 'react-icons/hi';
import CheckBoxCricle from '../../cart/components/check-box-circle';
import { MyAddress } from './address-data';
import { useEffect, useState } from 'react';
interface Proptype extends ReactProps{
    address:MyAddress,
    onClick:Function
}

export function AddressItem(props:Proptype) {
    const [address, setAddress] = useState(props.address);
    useEffect(() => {
        setAddress(props.address);
      }, [props.address]);
    return (
        <div className={props.address.default?"border-b-2 text-16 sm:text-20 leading-7 py-4 bg-primary-light":"border-b-2 text-16 sm:text-20 leading-7 py-4"} >
            <div className="flex items-center gap-1 cursor-pointer w-11/12 mx-auto">
                <CheckBoxCricle checked={props.address.default}/>
                <div className="">
                    <p className="font-semibold whitespace-nowrap">{props.address.name} - {props.address.numberPhone}</p>
                    <p>{props.address.address}</p>
                </div>
            </div>
            <div className="flex items-center whitespace-nowrap text-gray-500 pt-2 w-11/12 mx-auto">
                {
                    props.address.default ? <p className="text-primary text-center px-4">[Mặc định]</p>
                     : <button className="btn-outline rounded-lg text-16 sm:text-20"
                     onClick={()=>props.onClick(props.address.id,"setDefault")}>Đặt mặc định</button>
                }
                <button className="ml-auto btn-default text-16 sm:text-20 px-0"><i className="p-1"><HiOutlinePencilAlt/></i>Chỉnh sửa</button>
                <button className="ml-3 btn-default hover:text-danger text-16 sm:text-20 px-0"><i className="p-1"><HiOutlineTrash/></i>Xóa</button>
            </div>
        </div >
    );
}
