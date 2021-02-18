import React from 'react';
import { Checkbox } from '../../../shared/form/checkbox';
import { useState } from 'react';
const Code = (props) => {
    const [check,setCheck]=useState(false);
    const sendCode=()=>{
        setCheck(!check);
        if(!check)
            props.setPromotion(props.item.code);
        else
            props.setPromotion(null);
    }
    return (
        <div className="flex items-center justify-evenly shadow-md rounded-md m-2" onClick={()=>sendCode()}>
            <div className="w-20 border-dashed border-r-2 p-2">
                <img src="/assets/img/logo.png" alt="logo"/>
            </div>
            <div className="p-2">
                <h3 className="text-lg">{props.item.content}</h3>
                <p className="text-gray-300">Hạn dùng đến: {props.item.expDate}</p>
                <p className="cursor-pointer text-primary">Điều kiện</p>
            </div>
            <div>
                <Checkbox checked={check}/>
            </div>
        </div>
    );
}

export default Code;
