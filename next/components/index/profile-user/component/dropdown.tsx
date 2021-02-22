import { type } from 'os';
import React from 'react';
type PropsType = {
    [x: string]: any;
    name?: string;
    id?:string;
    dateOfBirth:Date,
    setDateOfBirth:Function
  };
const Dropdown = (props:PropsType) => {
    let day = props.dateOfBirth.getDate();
    let year = props.dateOfBirth.getFullYear();
    let month = props.dateOfBirth.getMonth();
    const getListOption=()=>{
        let list: number[] = [];
        switch (props.id) {
            case "day":
                {
                    let dateLenght= new Date(year,month, 0).getDate();
                    for (let index = 1; index <= dateLenght; index++) {
                        list.push(index);
                    }
                }
                return list;
            case "month":{
                list=[1,2,3,4,5,6,7,8,9,10,11,12];
            } return list;
            case "year":{
                let date= new Date();
                for (let year = 1930; year <= date.getFullYear(); year++) {
                    list.push(year);
                }
            } return list;
            default:
                break;
        }
    }
    const listOptions:number[] = getListOption();
    const sendDate=(value,id)=>{
        let date = new Date();
        if(id==="date")
        {
            date=new Date(`${year}-${month}-${value}`);
        }
        if(id==="month"){
            date=new Date(`${year}-${value}-${day}`);
        }
        if(id==="year"){
            date=new Date(`${value}-${month}-${year}`);
        }
        props.setDateOfBirth(date);
    }
    return (
        <select className="btn-outline w-full" name={props.name} id={props.id} onChange={(e)=>sendDate(e.target.value,props.id)}>
            {
                listOptions.map((item,index)=>{
                    return <option key={index} value={item}>{item<10?"0"+item:item}</option>
                })
            }
        </select>
    );
}

export default Dropdown;
