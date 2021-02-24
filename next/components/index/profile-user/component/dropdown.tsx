import React from 'react';
type PropsType = {
    [x: string]: any;
    name?: string;
    id?:string;
    defaultValue?:string,
    listOptions: any[],
    onChanged?: Function;
  };
const Dropdown = (props:PropsType) => {
    return (
        <select className="btn-outline w-full h-12 text-16 sm:text-20 px-0 sm:pl-2" 
                name={props.name} 
                defaultValue={props.defaultValue} 
                id={props.id} 
                onChange={(e)=>props.onChanged(e.target.value)}>
            {
                props.listOptions.map((item,index)=>{
                    return <option className={item===props.defaultValue?"bg-primary-light":""} key={index} value={item}>{item}</option>
                })
            }
        </select>
    );
}

export default Dropdown;
