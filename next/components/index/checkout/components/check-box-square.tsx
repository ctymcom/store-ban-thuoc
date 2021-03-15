import React from "react";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useState, useEffect } from "react";
interface PropType extends ReactProps {
  checked: boolean;
  text?: string;
  onClick?: Function;
}
const CheckBoxSquare = (props: PropType) => {
  const [checkedLocal, setCheckedLocal] = useState(props.checked);
  return (
    <div
      className={`flex cursor-pointer gap-2 items-center ${props.className || ""}`}
      onClick={() => {
        props.onClick(!props.checked);
      }}
    >
      {props.checked ? (
        <i className="text-primary">
          <FaCheckSquare />
        </i>
      ) : (
        <i>
          <FaRegSquare />
        </i>
      )}
      <p className="text-16">{props.text}</p>
    </div>
  );
};

export default CheckBoxSquare;
