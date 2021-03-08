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
    setUserAddress(null);
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
  
  const updateOrUserAddress = (data:UserAddress)=>{
      const { contactName, address, provinceId,
        districtId, wardId, phone, location, isDefault } = data
        UserAddressService.createOrUpdate({ id: data.id, data: { 
        contactName,
        address, provinceId,
        districtId, wardId, phone, location, isDefault } }).then(res => {
        loadList();
      }).catch(err => {
        alert(err)
      }) 
  }
  async function setDefaultAddress(id:string) {
    let oldDefault = listAddress.find(item=>item.isDefault);
    let newDefault = listAddress.find(item=>item.id===id);
    UserAddressService.mutate({
      mutation:[
        UserAddressService.updateQuery({id: oldDefault.id, data: { isDefault: false}}),
        UserAddressService.updateQuery({id: newDefault.id, data: { isDefault: true}}),
      ]
    }).then(res => {
      loadList()
    }).catch(err => {
      console.error(err)
  })
}

  const handleChange=(id:string,type:string)=>{
      switch (type) {
          case "setDefault":{
            if(id){
              setDefaultAddress(id);
            }
          }
              break;
          case "delete":{
                if(listAddress.length>0)
                {
                  let addressDeleting = listAddress.find(item=>item.id===id);
                  if(addressDeleting.isDefault){
                    let idNewDefault:string;
                    listAddress.forEach(item => {
                      if(!item.isDefault)
                      {
                        idNewDefault=item.id
                        return;
                      }
                    });
                    setDefaultAddress(idNewDefault);
                  }
                  UserAddressService.delete({id}).then(res=>
                  loadList()
                  )}
              }
              break;
          case "formAddress":{
              if(userAddress.isDefault){
                if(id){
                  setDefaultAddress(id)
                }else{
                  let oldDefault = listAddress.find(item=>item.isDefault);
                  UserAddressService.update({id:oldDefault.id,data:{isDefault:false}}).then(res=>
                    updateOrUserAddress(userAddress)   
                  )
                }
              }else{
                if(listAddress.length!==0){
                    updateOrUserAddress(userAddress) 
                }else{
                  updateOrUserAddress({...userAddress,isDefault:true})   
                }
              }
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
