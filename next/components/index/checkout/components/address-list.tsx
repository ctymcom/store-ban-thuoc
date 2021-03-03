import React from 'react';
import { AddressItem } from './address-item';
import { useAddressContext } from '../providers/address-provider';
import { UserAddress } from '../../../../lib/repo/user-address.repo';

export function AddressList() {
    const{ listAddress } = useAddressContext();
    return (
        <div>
            {
                listAddress.map((item:UserAddress, index:number) => {
                    return item.isDefault? <AddressItem key={index} address={item}/>:""
                })
            };
            {
                listAddress.map((item:UserAddress, index:number) => {
                    return !item.isDefault? <AddressItem key={index} address={item}/>:""
                })
            }
        </div>
    );
}
