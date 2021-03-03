import React from 'react';
import { AddressItem } from './address-item';
import { useAddressContext } from '../providers/address-provider';
import { UserAddress } from '../../../../lib/repo/user-address.repo';
export interface PropsTypeFormDialog extends ReactProps{
    showAddressFormDialog?:boolean, 
    setShowAddressFormDialog?:Function
}
 
export function AddressList(props:PropsTypeFormDialog) {
    const{ listAddress } = useAddressContext();
    return (
        <div>
            {
                listAddress.map((item:UserAddress, index:number) => {
                    return item.isDefault? <AddressItem key={index} address={item} showAddressFormDialog={props.showAddressFormDialog} setShowAddressFormDialog={props.setShowAddressFormDialog}/>:""
                })
            };
            {
                listAddress.map((item:UserAddress, index:number) => {
                    return !item.isDefault? <AddressItem key={index} address={item} showAddressFormDialog={props.showAddressFormDialog} setShowAddressFormDialog={props.setShowAddressFormDialog}/>:""
                })
            }
        </div>
    );
}
