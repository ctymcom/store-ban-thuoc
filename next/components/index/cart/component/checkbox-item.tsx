import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
type PropsType = {
    [x: string]: any;
    checked?: boolean
  };
const CheckboxItem = (props:PropsType) => {
    return (
        <div>
            <i className={props.checked?"text-primary":"text-gray-300"}><FaCheckCircle/></i>
        </div>
    );
}

export default CheckboxItem;
