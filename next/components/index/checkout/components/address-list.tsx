import React from 'react';
import { AddressItem } from './address-item';
import { MyAddress } from './address-data';
import { useAddressContext } from '../providers/address-provider';

export function AddressList() {
    const{ listAddress } = useAddressContext();
    return (
        <div>
            {
                listAddress.map((item:MyAddress, index:number) => {
                    return item.default? <AddressItem key={index} address={item}/>:""
                })
            };
            {
                listAddress.map((item:MyAddress, index:number) => {
                    return !item.default? <AddressItem key={index} address={item}/>:""
                })
            }
        </div>
    );
}
