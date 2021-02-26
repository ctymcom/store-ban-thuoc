import React from 'react';
import { createContext, useState, useEffect, useContext, Children } from 'react';
import { MyAddress, listAddressData } from '../components/address-data';
export const AddressContext = createContext<Partial<{
  listAddress: MyAddress[]
  addressSelected: MyAddress,
  setListAdress:Function,
  showDialogCreateAddress:boolean,
  setShowDialogCreateAddress:Function,
  setAddressSelected:Function,
  handleChange:Function
}>>({});

export const AddressProvider = (props) => {
  const [listAddress, setListAdress] = useState<MyAddress[]>(listAddressData);
  const [showDialogCreateAddress, setShowDialogCreateAddress] = useState<boolean>(false);
  let addr = listAddress.find((item:MyAddress)=>item.default);
  const [addressSelected, setAddressSelected] = useState<MyAddress>(addr);
  useEffect(() => {
      setListAdress(listAddress);
    }, [listAddress]);
  const handleChange=(id:number,type:string)=>{
      switch (type) {
          case "setDefault":{
                console.log(type);
                setListAdress(listAddress.map((item:MyAddress)=> item.id === addr.id ? {...item, default : false} : item));
                setListAdress(listAddress.map((item:MyAddress)=> item.id === id ? {...item, default : true} : item))
              }
              break;
          default:
              break;
      }
  }
  return<AddressContext.Provider value={{ handleChange,listAddress, addressSelected, setAddressSelected, setListAdress, showDialogCreateAddress, setShowDialogCreateAddress}}>
      {props.children}
    </AddressContext.Provider>;
}
export const useAddressContext = () => useContext(AddressContext);
