import React from 'react';
import { createContext, useState, useEffect, useContext, Children } from 'react';
import { AddressService } from '../../../../lib/repo/address.repo';
import { UserAddressService, UserAddress, UpdateUserAddressInput } from '../../../../lib/repo/user-address.repo';
import { useAuth } from '../../../../lib/providers/auth-provider';
import { cloneDeep } from 'lodash';
import { useCheckoutContext } from './checkout-provider';
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
  const [userAddress, setUserAddress] = useState<UserAddress>(null);
  const {setAddressSelected} = useCheckoutContext();

  const { user } = useAuth()
  const loadList = () =>{
    UserAddressService.getAll( {query:{
      limit:0,
      filter: { userId: user.id }
    },fragment:UserAddressService.fullFragment}).then(res=>{
    setListAdress(cloneDeep(res.data));
    setAddressSelected(res.data.find((item:UserAddress)=>item.isDefault));
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
  const updateUserAddress =(data:UserAddress)=>{
    console.log(data);
    const { contactName, address, provinceId,
      districtId, wardId, phone, location, isDefault } = data
      UserAddressService.createOrUpdate({ id: data.id, data: { 
      contactName,
      address, provinceId,
      districtId, wardId, phone, location, isDefault } }).then(res => {
        if(data.isDefault){
          listAddress.forEach((item:UserAddress)=>{
            item.id!==data.id?updateUserAddress({...item,isDefault:false}):updateUserAddress({...item,isDefault:true});
          })
        }
      setUserAddress(null)
      loadList();
    }).catch(err => {
      alert(err)
    }) 
  }
  const handleChange=(id:string,type:string)=>{
      switch (type) {
          case "setDefault":{
             updateUserAddress({...listAddress[listAddress.findIndex(item=>item.id=id)],isDefault:true})
          }
              break;
          case "delete":{
                listAddress.length>1? UserAddressService.delete({id}).then(res=>
                  loadList()
                  ):""
              }
              break;
          case "formAddress":{
            updateUserAddress(userAddress);
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
