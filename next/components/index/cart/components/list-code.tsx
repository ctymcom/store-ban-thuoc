import React from 'react';
import Code from './code';

const ListCode = (props) => {
    return (
        <div>
            {
                props.listPromotionCode.map((item,index)=>{
                    return <div key={index} className="text-20">
                        <Code item={item}  index={index} choseCode={props.choseCode}/>
                    </div>
                })
            }
        </div>
    );
}

export default ListCode;
