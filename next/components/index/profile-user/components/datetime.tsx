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
        let listDay:string[] =[];
        for(let index=1;index<=dayInMonth;index++){
          listDay.push(index.toString());
        }
        return listDay;
      }
      case "month":{
        let listMonth:string[]=["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
        return listMonth;
      }
      case "year":{
        let listYear:string[]=[];
        let dateCur =  new Date();
        let yearCur =getYear(dateCur);
        for(let index=1930;index<=yearCur;index++){
          listYear.push(index.toString());
        }
        return listYear;
      }
      default:
        break;
      }
  }
  const [listDay,setListDay]=useState(getListOptions(props.dateOfBirth,"day"));
  const listMonth:string[]=getListOptions(props.dateOfBirth,"month");
  const listYear:string[]=getListOptions(props.dateOfBirth,"year");
  const handleChangeDateOfBirth=(id:string,value:any)=>{
    let date =new Date(props.dateOfBirth);
    switch (id) {
      case "day":{
        date = setDate(date,value);
        props.handleChange("dateOfBirth",date);        
      }break;
      case "month":{
        let month = listMonth.findIndex(item=>item===value);
        date = setMonth(date,month);
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
      defaultValue={getDate(props.dateOfBirth).toString()} 
      listOptions={listDay} 
      onChanged={(e)=>{handleChangeDateOfBirth("day",e)}}/>
      <Dropdown name={"month"} id={"month"} 
      defaultValue={listMonth[getMonth(props.dateOfBirth)]} 
      listOptions={listMonth} 
      onChanged={(e)=>{handleChangeDateOfBirth("month",e)}} />
      <Dropdown name={"year"} id={"year"} 
      defaultValue={getYear(props.dateOfBirth).toString()} 
      listOptions={listYear} 
      onChanged={(e)=>{handleChangeDateOfBirth("year",e)}}/>
    </>
  );
}

export default DateTime;
