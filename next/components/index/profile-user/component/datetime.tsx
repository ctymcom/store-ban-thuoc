import React from 'react';
import Dropdown from './dropdown';
import { getDate,getDaysInMonth,getMonth,getYear, setDate, setMonth, setYear } from 'date-fns'
import { useState } from 'react';
type PropsType = {
  [x: string]: any;
  dateOfBirth:Date,
};
const DateTime = (props:PropsType) => {
  const getListOptions=(date:Date,id:string)=>{
    switch (id) {
      case "day":{
        let dayInMonth=getDaysInMonth(date);
        let listDay:number[] =[];
        for(let index=1;index<=dayInMonth;index++){
          listDay.push(index);
        }
        return listDay;
      }
      case "month":{
        let listMonth:number[]=[1,2,3,4,5,6,7,8,9,10,11,12];
        return listMonth;
      }
      case "year":{
        let listYear:number[]=[];
        let dateCur =  new Date();
        let yearCur =getYear(dateCur);
        for(let index=1930;index<=yearCur;index++){
          listYear.push(index);
        }
        return listYear;
      }
      default:
        break;
      }
  }
  const [listDay,setListDay]=useState(getListOptions(props.dateOfBirth,"day"));
  const listMonth:number[]=getListOptions(props.dateOfBirth,"month");
  const listYear:number[]=getListOptions(props.dateOfBirth,"year");
  const handleChangeDateOfBirth=(id:string,value:number)=>{
    let date =new Date(props.dateOfBirth);
    switch (id) {
      case "day":{
        date = setDate(date,value);
        props.handleChange("dateOfBirth",date);        
      }break;
      case "month":{
        date = setMonth(date,value-1);
        props.handleChange("dateOfBirth",date);
        let listDayNew = getListOptions(date,"day");
        setListDay([...listDayNew]);
      }break;
      case "year":{
        date = setYear(date,value);
        props.handleChange("dateOfBirth",date);
        let listDayNew = getListOptions(date,"day");
        setListDay([...listDayNew]);
      }break;
    
      default:
        break;
    }
  }
  return (
    <>
      <Dropdown name={"day"} id={"day"} 
      defaultValue={getDate(props.dateOfBirth)} 
      listOptions={listDay} 
      onChanged={(e)=>{handleChangeDateOfBirth("day",e)}}/>
      <Dropdown name={"month"} id={"month"} 
      defaultValue={listMonth[getMonth(props.dateOfBirth)]} 
      listOptions={listMonth} 
      onChanged={(e)=>{handleChangeDateOfBirth("month",e)}} />
      <Dropdown name={"year"} id={"year"} 
      defaultValue={getYear(props.dateOfBirth)} 
      listOptions={listYear} 
      onChanged={(e)=>{handleChangeDateOfBirth("year",e)}}/>
    </>
  );
}

export default DateTime;
