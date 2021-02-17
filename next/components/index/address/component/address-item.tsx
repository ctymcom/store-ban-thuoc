import React from 'react';


export function AddressItem(props) {
    return (
        <div className="col-span-1 border-2 border-gray-300 rounded" >
            <div className="p-3">
                <div className="flex justify-between">
                    <div className="">{props.item.name}</div>
                    <div className="text-12 cursor-pointer">
                        {
                            props.item.default ? <p className="text-primary">Địa chỉ mặc định</p> : <p className="text-danger">Xóa địa chỉ</p>
                        }
                    </div>
                </div>
                <div className="text-12 pb-2">
                    <p>Địa chỉ: {props.item.address}</p>
                    <p>Điện thoại: {props.item.numberPhone}</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-primary font-normal">Giao đến địa chỉ này</button>
                    <button className="btn-outline text-primary font-normal">Chỉnh sửa địa chỉ</button>
                </div>
            </div>
        </div >
    );
}
