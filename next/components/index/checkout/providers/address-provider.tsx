import React from 'react';
import { createContext, useState, useEffect, useContext, Children } from 'react';
import { AddressService } from '../../../../lib/repo/address.repo';
import { UserAddressService, UserAddress, UpdateUserAddressInput } from '../../../../lib/repo/user-address.repo';
import { useAuth } from '../../../../lib/providers/auth-provider';
export const AddressContext = createContext<Partial<{
  listAddress: UserAddress[]
  addressSelected: UserAddress,
  showDialogAddress:boolean,
  setShowDialogAddress:Function,
  addressEdit:UserAddress,
  setListAdress:Function,
  setAddressSelected:Function,
  handleChange:Function,
  setAddressEdit:Function,
  provinces:Option[], 
  setProvinces:Function,
  districts:Option[],
  wards:Option[],
}>>({});

export const AddressProvider = (props) => {
  const [listAddress, setListAdress] = useState<UserAddress[]>(null);
  const [showDialogAddress, setShowDialogAddress] = useState(false);
  const [addressSelected, setAddressSelected] = useState<UserAddress>(null);
  const [addressEdit, setAddressEdit] = useState<UserAddress>(null);
  const [reload, setReload] = useState<boolean>(false);
  useEffect(() => {
      setListAdress(listAddress);
    }, [listAddress]);

  const setDefaultAddress=(id:string)=>{
    setListAdress(listAddress.map((item:UserAddress)=> item.id!== id ? {...item, default : false} : {...item,default:true}));
  }

  const { user } = useAuth()
  useEffect(() => {
    UserAddressService.getAll( {query:{
      limit:0,
      filter: { userId: user.id }
    },fragment:UserAddressService.fullFragment}).then(res=>{
    setListAdress(res.data.map((item:UserAddress)=> item));
    setAddressSelected(res.data.find((item:UserAddress)=>item.isDefault));
    setReload(false);
   }) 
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
    AddressService.getDistricts(addressEdit?addressEdit.provinceId:"").then(res=>{
      setDistricts([{ value:'',label: 'Chọn Quận/Huyện' },...res.map(x=>({value:x.id,label:x.district}))])
    })
  }, [addressEdit]);
  useEffect(() => {
    AddressService.getWards(addressEdit?addressEdit.districtId:"").then(res=>{
      setWards([{value:'',label:'Chọn Phường/Xã'},...res.map(x=>({value:x.id,label:x.ward}))])
    })
  }, [addressEdit]);
  const handleChange=(id:string,type:string)=>{
      switch (type) {
          case "setDefault":{
            setDefaultAddress(id)    
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
          case "edit":{
              let ward=wards[wards.findIndex(item=>item.value===addressEdit.wardId)].label;
              let district=districts[districts.findIndex(item=>item.value===addressEdit.districtId)].label;
              let province=provinces[provinces.findIndex(item=>item.value===addressEdit.provinceId)].label;
              let fullAddress=`${addressEdit.address}, ${ward}, ${district}, ${province}`
              setAddressEdit({...addressEdit,fullAddress})
              const { contactName, address, provinceId,
                districtId, wardId, phone, location, isDefault } = addressEdit
                UserAddressService.update({ id: addressEdit.id, data: { 
                contactName, fullAddress,
                address, provinceId,
                districtId, wardId, phone, location, isDefault } }).then(res => {
                setReload(false);
                alert('Thành công')
              }).catch(err => {
                alert('Thất bại')
              }) 
          } break;
          default:
              break;
      }
  }
  return<AddressContext.Provider value={{districts,
                                        provinces, setProvinces, 
                                        wards,
                                        handleChange,listAddress, 
                                        addressSelected, addressEdit, 
                                        showDialogAddress, setShowDialogAddress, 
                                        setAddressSelected, setListAdress, 
                                        setAddressEdit}}>
      {props.children}
    </AddressContext.Provider>;
}
export const useAddressContext = () => useContext(AddressContext);
