import React from 'react';
import { useState } from 'react';
import CheckboxItem from '../../cart/components/check-box-circle';

const Gender = (props) => {
    const [gender,setGender]=useState(props.gender);
    const handleChangeGender=(id:string)=>{
        setGender(id);
        props.handleChange("gender",id);
    }
    return (
        <>
            <div className="flex items-center cursor-pointer gap-0" onClick={()=>handleChangeGender("male")}>
                <CheckboxItem checked={gender ==="male"?true:false}/>
                <p>Nam</p>
            </div>
            <div className="flex items-center cursor-pointer" onClick={()=>handleChangeGender("female")}>
                <CheckboxItem checked={gender ==="female"?true:false}/>
                <p>Nữ</p>
            </div>
            <div className="flex items-center cursor-pointer" onClick={()=>handleChangeGender("other")}>
                <CheckboxItem checked={gender ==="other"?true:false}/>
                <p>Khác</p>
            </div>
        </>
    );
}

export default Gender;
