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
  const [addressSelected, setAddressSelected] = useState<MyAddress>(listAddress.find((item:MyAddress)=>item.default));
  useEffect(() => {
      setListAdress(listAddress);
    }, [listAddress]);
  const handleChange=(id:number,type:string)=>{
      switch (type) {
          case "setDefault":{
                setListAdress(listAddress.map((item:MyAddress)=> item.id!== id ? {...item, default : false} : {...item,default:true}));
              }
              break;
          case "delete":{
            let index = listAddress.findIndex((item:MyAddress)=>item.id===id)
            let listNew = listAddress;
            if (index !== -1&&listAddress.length>1) {
                if(listNew[index].id===addressSelected.id)
                {
                  if(listNew[index+1]){
                    setAddressSelected(listNew[index+1])
                  }else{
                    setAddressSelected(listNew[index-1])
                  }
                }
                if(listNew[index].default)
                {
                  if(listNew[index+1]){
                    listNew[index+1].default=true
                  }else{
                    listNew[index-1].default=true
                  }
                }
                listNew.splice(index, 1);
            }
            setListAdress([...listNew]);
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
