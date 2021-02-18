import React from 'react';
import Code from './code';
import { useState } from 'react';

const ListCode = (props) => {
    const [ListCode, setListCode] = useState(2);
    return (
        <div>
            <p>Số lượng mã tối đa được chọn: {ListCode}</p>
            {
                props.listPromotionCode.map((item,index)=>{
                    return <div key={index}>
                        <Code item={item} setPromotion={props.setPromotion} index={index}/>
                    </div>
                })
            }
        </div>
    );
}

export default ListCode;
