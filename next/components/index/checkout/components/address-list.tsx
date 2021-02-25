import React from 'react';
import { AddressItem } from './address-item';
import { useState, useEffect } from 'react';
import { MyAddress, listAdressData } from './address-data';

export function AddressList(props) {
    const [listAdress, setListAdress] = useState([...listAdressData]);
    let index = listAdress.findIndex((item:MyAddress)=>item.default);
    useEffect(() => {
        setListAdress(listAdress);
      }, [listAdress]);
    const handleChange =(id:number,type:string)=>{
        switch (type) {
            case "setDefault":{
                setListAdress(listAdress.map((item:MyAddress)=> item.id === index+1 ? {...item, default : false} : item));
                setListAdress(listAdress.map((item:MyAddress)=> item.id === id ? {...item, default : true} : item))
                }
                break;
            default:
                break;
        }
    }
    return (
        <>
            {
                listAdress.map((item:MyAddress, index:number) => {
                    return <AddressItem key={index} address={item} onClick={handleChange}/>
                })
            }
        </>
    );
}
