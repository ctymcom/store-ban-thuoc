import React from 'react';
import { FaCheck } from 'react-icons/fa'

const CustomCheckbox = (props) => {
    return (
        <div className={props.isCheck ? "custom-checkbox-checked" : "custom-checkbox-checked"} onClick={() => props.setIsCheck(!props.isCheck)}>
            {
                props.isCheck ? <i className="text-sm"><FaCheck /></i> : <></>
            }
        </div>
    );
}

export default CustomCheckbox;
