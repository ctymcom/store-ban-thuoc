import React from 'react';
import { Checkbox } from '../../../shared/form/checkbox';
import { useState } from 'react';

const Gender = (props) => {
    const [gender,setGender]=useState(props.gender);
    const handleChangeGender=(e:boolean,id:string)=>{
        if(e){
            setGender(id);
        }else{
            setGender("male");
        }
    }
    return (
        <>
            <p className="col-span-1">Giới tính</p>
            <div className="flex items-center col-span-1">
                <Checkbox checked={gender ==="male"?true:false} id="male" onChanged={(e)=>{handleChangeGender(e,"male")}}/>
                <p>Nam</p>
            </div>
            <div className="flex items-center col-span-1">
                <Checkbox checked={gender ==="female"?true:false} id="female" onChanged={(e)=>{handleChangeGender(e,"female")}}/>
                <p>Nữ</p>
            </div>
            <div className="flex items-center col-span-1">
                <Checkbox checked={gender ==="other"?true:false} id="other" onChanged={(e)=>{handleChangeGender(e,"other")}}/>
                <p>Khác</p>
            </div>
        </>
    );
}

export default Gender;
