import { type } from 'os';
import React from 'react';
import { useState } from 'react';
type PropsType = {
    [x: string]: any;
    name?: string;
    id?:string;
    defaultValue?:number,
    listOptions: number[],
    onChanged?: Function;
  };
const Dropdown = (props:PropsType) => {
    return (
        <select className="btn-outline w-full h-12 text-20" name={props.name} defaultValue={props.defaultValue} id={props.id} onChange={(e)=>props.onChanged(e.target.value)}>
            {
                props.listOptions.map((item,index)=>{
                    return <option key={index} value={item}>{item<10?"0"+item:item}</option>
                })
            }
        </select>
    );
}

export default Dropdown;
