import React from 'react';
import { useState } from 'react';
import { expect } from 'chai';
const Code = (props) => {
    const sendCode=()=>{
        props.choseCode(props.item.code);
    }
    const [showMore, setShowMore] = useState(false);
    const setShow=(e)=>{
        if (!e) 
         e = window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) e.stopPropagation();
        setShowMore(!showMore)
    }
    return (<>
        <div className="flex items-center justify-around shadow-md rounded-md m-2 border-2 border-white hover:border-primary hover:text-primary transition-all duration-300 ease-in-out"
             onClick={()=>sendCode()}>
            <div className="w-20 border-dashed border-r-2 p-2">
                <img src="/assets/img/logo.png" alt="logo"/>
            </div>
            <div className="p-2 cursor-pointer">
                <h3 className="text-lg">{props.item.content}</h3>
                <p className="text-gray-400">Hạn dùng đến: {props.item.expDate}</p>
                <p className={showMore?"cursor-pointer w-16 whitespace-nowrap rounded-md hover:bg-danger-light":"cursor-pointer text-primary w-16 whitespace-nowrap rounded-md hover:bg-info-light" } onClick={(e)=>setShow(e)}>{showMore?"Thu nhỏ":"Điều kiện"}</p>
            </div>
        </div>
        {
            showMore?
                <div>
                    <p className="m-2">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non obcaecati voluptatum ab, nulla tenetur eius molestiae dolore ea. Iure, quibusdam.
                        </p>
                </div>: <div></div>
        }</>
    );
}

export default Code;
