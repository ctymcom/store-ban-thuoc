import React from 'react';
import { useState } from 'react';
const Code = (props) => {
    const sendCode=()=>{
        props.choseCode(props.item.code);
    }
    const [showMore, setShowMore] = useState(false);
    return (<>
        <div className="flex items-center justify-around shadow-md rounded-md m-2">
            <div className="w-20 border-dashed border-r-2 p-2">
                <img src="/assets/img/logo.png" alt="logo"/>
            </div>
            <div className="p-2 cursor-pointer transform hover:scale-110 transition-all duration-300 ease-in-out" onClick={()=>sendCode()}>
                <h3 className="text-lg">{props.item.content}</h3>
                <p className="text-gray-400">Hạn dùng đến: {props.item.expDate}</p>
            </div>
            <p className={showMore?"cursor-pointer":"cursor-pointer text-primary" } onClick={()=>setShowMore(!showMore)}>{showMore?"Thu nhỏ":"Điều kiện"}</p>
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
