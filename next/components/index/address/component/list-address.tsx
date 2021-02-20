import React from 'react';
import { AddressItem } from './address-item';

export function ListAddress(props) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {
                props.ListAddr.map((item, index) => {

                    return <AddressItem key={index} item={item} />
                })
            }
        </div>
    );
}
