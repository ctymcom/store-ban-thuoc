import React from 'react';
import { createContext, useState, useEffect, useContext, Children } from 'react';
import { AddressService } from '../../../../lib/repo/address.repo';
import { UserAddressService, UserAddress, UpdateUserAddressInput } from '../../../../lib/repo/user-address.repo';
import { useAuth } from '../../../../lib/providers/auth-provider';
import { cloneDeep } from 'lodash';
export const AddressContext = createContext<Partial<{
  listAddress: UserAddress[]
  addressSelected: UserAddress,
  userAddress:UserAddress,
  setListAdress:Function,
  setAddressSelected:Function,
  handleChange:Function,
  setUserAddress:Function,
  provinces:Option[], 
  setProvinces:Function,
  districts:Option[],
  wards:Option[],
}>>({});

export const AddressProvider = (props) => {
  const [listAddress, setListAdress] = useState<UserAddress[]>(null);
  const [addressSelected, setAddressSelected] = useState<UserAddress>(null);
  const [userAddress, setUserAddress] = useState<UserAddress>(null);

  const { user } = useAuth()
  const loadList = () =>{
    UserAddressService.getAll( {query:{
      limit:0,
      filter: { userId: user.id }
    },fragment:UserAddressService.fullFragment}).then(res=>{
    setListAdress(cloneDeep(res.data));
   })
  }
  useEffect(() => {
    loadList();
  }, []);
  const [provinces, setProvinces] = useState<Option[]>(null);
  const [districts,setDistricts] = useState<Option[]>(null);
  const [wards, setWards] = useState<Option[]>(null);
  useEffect(() => {
    AddressService.getProvinces().then(res => {
      setProvinces([{ value: '', label: 'Chọn Tỉnh/Thành' }, ...res.map(x => ({ value: x.id, label: x.province }) )])
    })
  }, []);
  useEffect(() => {
    AddressService.getDistricts(userAddress?userAddress.provinceId:"").then(res=>{
      setDistricts([{ value:'',label: 'Chọn Quận/Huyện' },...res.map(x=>({value:x.id,label:x.district}))])
    })
  }, [userAddress?.provinceId]);
  useEffect(() => {
    AddressService.getWards(userAddress?userAddress.districtId:"").then(res=>{
      setWards([{value:'',label:'Chọn Phường/Xã'},...res.map(x=>({value:x.id,label:x.ward}))])
    })
  }, [userAddress]);
  const handleChange=(id:string,type:string)=>{
      switch (type) {
          case "setDefault":{
             
          }
              break;
          case "delete":{
            let index = listAddress.findIndex((item:UserAddress)=>item.id===id)
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
          case "formAddress":{
              const { contactName, address, provinceId,
                districtId, wardId, phone, location, isDefault } = userAddress
                UserAddressService.createOrUpdate({ id: userAddress.id, data: { 
                contactName,
                address, provinceId,
                districtId, wardId, phone, location, isDefault } }).then(res => {
                setUserAddress(null);
                loadList();
              }).catch(err => {
                alert('Thất bại')
              }) 
          } break;
          default:
              break;
      }
  }
  return<AddressContext.Provider value={{districts, provinces, setProvinces, 
                                        wards, handleChange, listAddress, 
                                        userAddress, setListAdress, setUserAddress}}>
      {props.children}
    </AddressContext.Provider>;
}
export const useAddressContext = () => useContext(AddressContext);
