import React from 'react';
import { AddressItem } from './address-item';
import { useState } from 'react';
import { MyAddress, listAdressData } from './address-data';

export function AddressList(props) {
    const [listAdress, setListAdress] = useState([...listAdressData]);
    let index = props.listAdress.findIndex((item:MyAddress)=>item.default);
    const [addressCurent, setAddressCurent] = useState(listAdress[index]);
    const handleSetCurrentAddress =(id:number,type:string)=>{
        switch (type) {
            case "setDefault":{
                
                index = props.listAdress.findIndex((item:MyAddress)=>item.id);
                setListAdress
            }
                
                break;
        
            default:
                break;
        }
    }
    return (
        <div className="">
            {
                props.listAdress.map((item:MyAddress, index:number) => {
                    return <AddressItem key={index} address={item} onClick={handleSetCurrentAddress}/>
                })
            }
        </div>
    );
}
