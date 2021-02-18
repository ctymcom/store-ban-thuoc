import React from 'react';
import Code from './code';
import { useState } from 'react';

const ListCode = (props) => {
    return (
        <div>
            {
                props.listPromotionCode.map((item,index)=>{
                    return <div key={index}>
                        <Code item={item}  index={index} choseCode={props.choseCode}/>
                    </div>
                })
            }
        </div>
    );
}

export default ListCode;
