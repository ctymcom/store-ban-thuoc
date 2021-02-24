import React from 'react';
import { Checkbox } from '../../../shared/form/checkbox';
import { useState } from 'react';

const Gender = (props) => {
    const [gender,setGender]=useState(props.gender);
    const handleChangeGender=(e:boolean,id:string)=>{
        if(e){
            setGender(id);
            props.handleChange("gender",id);
        }else{
            setGender("male");
            props.handleChange("gender","male");
        }
    }
    return (
        <>
            <div className="flex items-center">
                <Checkbox checked={gender ==="male"?true:false} id="male" onChanged={(e)=>{handleChangeGender(e,"male")}}/>
                <p>Nam</p>
            </div>
            <div className="flex items-center">
                <Checkbox checked={gender ==="female"?true:false} id="female" onChanged={(e)=>{handleChangeGender(e,"female")}}/>
                <p>Nữ</p>
            </div>
            <div className="flex items-center">
                <Checkbox checked={gender ==="other"?true:false} id="other" onChanged={(e)=>{handleChangeGender(e,"other")}}/>
                <p>Khác</p>
            </div>
        </>
    );
}

export default Gender;
