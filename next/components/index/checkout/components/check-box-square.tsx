import React from 'react';
import { FaRegCheckSquare, FaRegSquare } from 'react-icons/fa'
import { useState, useEffect } from 'react';
interface PropType extends ReactProps{
    checked:boolean
}
const CheckBoxSquare = (props:PropType) => {
    const [checkedLocal, setCheckedLocal] = useState(props.checked);
    useEffect(() => {
        setCheckedLocal(props.checked);
      }, [props.checked]);
    return (
        <div>
            {
                checkedLocal ? <i className="text-primary"><FaRegCheckSquare /></i> : <i><FaRegSquare/></i>
            }
        </div>
    );
}

export default CheckBoxSquare;
