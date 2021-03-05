import React from 'react';
import Dropdown from './dropdown';
import { getDate,getDaysInMonth,getMonth,getYear, setDate, setMonth, setYear } from 'date-fns'
import { useState } from 'react';
type PropsType = {
  [x: string]: any;
  typeStore: number
};
const TypeStore = (props:PropsType) => {
  const getListOptions=(type:Number,id:string)=>{
    switch (id) {
      case "day":{
        let typeStores= ["Phòng khám", "Nhà thuốc", "Trình dược viên"];
        let listTypeStore:string[] =[];
        for(let index=1;index<=typeStores.length;index++){
          listTypeStore.push(index.toString());
        }
        return listTypeStore;
      }
      // case "month":{
      //   let listMonth:string[]=["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
      //   return listMonth;
      // }
      // case "year":{
      //   let listYear:string[]=[];
      //   let dateCur =  new Date();
      //   let yearCur =getYear(dateCur);
      //   for(let index=1930;index<=yearCur;index++){
      //     listYear.push(index.toString());
      //   }
      //   return listYear;
      // }
      // default:
      //   break;
      // }
  }
  const [listTypeStore,setListTypeStore]=useState(getListOptions(props.typeStore,"day"));
  
  const handleChangeDateOfBirth=(id:string,value:any)=>{
    let date =new Date(props.dateOfBirth);
    switch (id) {
      case "day":{
        date = setDate(date,value);
        props.handleChange("dateOfBirth",date);        
      }break;
      default:
        break;
    }
  }
  return (
    <>
      <Dropdown name={"type-store"} id={"type-store"} 
      defaultValue={getDate(props.dateOfBirth).toString()} 
      listOptions={listTypeStore} 
      onChanged={(e)=>{handleChangeDateOfBirth("day",e)}}/>
    </>
  );
}

export default TypeStore;
