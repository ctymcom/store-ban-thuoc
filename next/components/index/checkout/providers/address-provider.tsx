import React from 'react';
import { createContext, useState, useEffect, useContext, Children } from 'react';
import { MyAddress, listAddressData } from '../components/address-data';
export const AddressContext = createContext<Partial<{
  listAddress: MyAddress[]
  addressSelected: MyAddress,
  showDialogCreateAddress:boolean,
  addressEdit:MyAddress,
  setListAdress:Function,
  setShowDialogCreateAddress:Function,
  setAddressSelected:Function,
  handleChange:Function,
  setAddressEdit:Function
}>>({});

export const AddressProvider = (props) => {
  const [listAddress, setListAdress] = useState<MyAddress[]>(listAddressData);
  const [showDialogCreateAddress, setShowDialogCreateAddress] = useState<boolean>(false);
  const [addressSelected, setAddressSelected] = useState<MyAddress>(listAddress.find((item:MyAddress)=>item.default));
  const [addressEdit, setAddressEdit] = useState<MyAddress>(listAddress.find((item:MyAddress)=>item.default));
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
          case "edit":{
            if(addressEdit){
              if(addressEdit.default){
                setListAdress(listAddress.map((item:MyAddress)=> item.id!== addressEdit.id ? {...item, default : false} : {...item,default:true}));
              }
              setListAdress(listAddress.map((item:MyAddress)=> item.id!== addressEdit.id ? item : addressEdit));
            }
          }
          default:
              break;
      }
  }
  return<AddressContext.Provider value={{ handleChange,listAddress, addressSelected, addressEdit, setAddressSelected, setListAdress, showDialogCreateAddress, setShowDialogCreateAddress, setAddressEdit}}>
      {props.children}
    </AddressContext.Provider>;
}
export const useAddressContext = () => useContext(AddressContext);
