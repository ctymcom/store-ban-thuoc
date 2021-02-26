import React from 'react';
import { AddressItem } from './address-item';
import { MyAddress } from './address-data';
import { useAddressContext } from '../providers/address-provider';

export function AddressList() {
    const{ listAddress } = useAddressContext();
    return (
        <>
            {
                listAddress.map((item:MyAddress, index:number) => {
                    return <AddressItem key={index} address={item}/>
                })
            }
        </>
    );
}
