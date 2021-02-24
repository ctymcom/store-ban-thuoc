import React, { useEffect } from 'react';
import { FaCheckCircle,FaRegCircle } from 'react-icons/fa';
import { useState } from 'react';
interface PropsType extends ReactProps {
    [x: string]: any;
    checked?: boolean,
  };
const CheckboxItem = (props:PropsType) => {
    
    const [Checked, setChecked] = useState(props.checked);
    useEffect(() => {
        setChecked(props.checked);
      }, [props.checked])
      return (
        <div className="cursor-pointer px-1">
            {
                Checked?<i className="text-primary"><FaCheckCircle/></i>:<i className="opacity-100"><FaRegCircle/></i>
            }
        </div>
    );
}

export default CheckboxItem;
