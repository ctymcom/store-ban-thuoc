import React from 'react';
import { createContext, useState, useEffect, useContext, Children } from 'react';
import { MyAddress, listAddressData } from '../components/address-data';
import { AddressService } from '../../../../lib/repo/address.repo';
export const AddressContext = createContext<Partial<{
  listAddress: MyAddress[]
  addressSelected: MyAddress,
  showAddressFormDialog:boolean,
  showDialogAddress:boolean,
  setShowDialogAddress:Function,
  addressEdit:MyAddress,
  setListAdress:Function,
  setShowAddressFormDialog:Function,
  setAddressSelected:Function,
  handleChange:Function,
  setAddressEdit:Function,
  provinces:Option[], 
  setProvinces:Function,
  province:string, 
  setProvince:Function,
  districts:Option[],
  setDistrict:Function,
  district:string,
  wards:Option[],
  ward:string, 
  setWard:Function,
}>>({});

export const AddressProvider = (props) => {
  const [listAddress, setListAdress] = useState<MyAddress[]>(listAddressData);
  const [showDialogAddress, setShowDialogAddress] = useState(false);
  const [showAddressFormDialog, setShowAddressFormDialog] = useState<boolean>(false);
  const [addressSelected, setAddressSelected] = useState<MyAddress>(listAddress.find((item:MyAddress)=>item.default));
  const [addressEdit, setAddressEdit] = useState<MyAddress>(listAddress.find((item:MyAddress)=>item.default));
  useEffect(() => {
      setListAdress(listAddress);
    }, [listAddress]);

  const setDefaultAddress=(id:number)=>{
    setListAdress(listAddress.map((item:MyAddress)=> item.id!== id ? {...item, default : false} : {...item,default:true}));
  }

  const [provinces, setProvinces] = useState<Option[]>(null);
  const [province, setProvince] = useState<string>('');
  const [districts,setDistricts] = useState<Option[]>(null);
  const [district,setDistrict] = useState<string>('');
  const [wards, setWards] = useState<Option[]>(null);
  const [ward, setWard] = useState<string>('');
  useEffect(() => {
    AddressService.getProvinces().then(res => {
      setProvinces([{ value: '', label: 'Chọn Tỉnh/Thành' }, ...res.map(x => ({ value: x.id, label: x.province }) )])
      setProvince('');
    }).catch((err)=>{console.log(err);
    })
  }, []);
  useEffect(() => {
    AddressService.getDistricts(province).then(res=>{
      setDistricts([{ value:'',label: 'Chọn Quận/Huyện' },...res.map(x=>({value:x.id,label:x.district}))])
      setDistrict('');
    })
  }, [province]);
  useEffect(() => {
    AddressService.getWards(district).then(res=>{
      setWards([{value:'',label:'Chọn Phường/Xã'},...res.map(x=>({value:x.id,label:x.ward}))])
      setWard('');
    })
  }, [district]);
  const handleChange=(id:number,type:string)=>{
      switch (type) {
          case "setDefault":{
            setDefaultAddress(id)    
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
              setListAdress(listAddress.map((item:MyAddress)=> item.id!== addressEdit.id ? item : addressEdit));
              if(addressEdit.default){
                setDefaultAddress(addressEdit.id);
              }else{
                let index = listAddress.findIndex((item)=>item.default);
                if(index===-1){
                  setListAdress(listAddress.map((item:MyAddress)=>item.id===1?{...item, default : false} : {...item,default:true}));
                }
              }
            }
          } break;
          default:
              break;
      }
  }
  return<AddressContext.Provider value={{districts, 
                                        district, setDistrict, 
                                        provinces, setProvinces, 
                                        setProvince, province,
                                        wards, ward, setWard,
                                        handleChange,listAddress, 
                                        addressSelected, addressEdit, 
                                        showDialogAddress, setShowDialogAddress, 
                                        setAddressSelected, setListAdress, 
                                        setShowAddressFormDialog, showAddressFormDialog, 
                                        setAddressEdit}}>
      {props.children}
    </AddressContext.Provider>;
}
export const useAddressContext = () => useContext(AddressContext);
