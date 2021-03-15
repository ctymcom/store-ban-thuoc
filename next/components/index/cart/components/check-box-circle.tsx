import React, { useEffect } from "react";
import { FaCheckCircle, FaRegCircle } from "react-icons/fa";
import { useState } from "react";
interface PropsType extends ReactProps {
  [x: string]: any;
  checked?: boolean;
}
const CheckBoxCricle = (props: PropsType) => {
  const [Checked, setChecked] = useState(props.checked);
  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);
  return (
    <div className="cursor-pointer px-1 text-16 sm:text-20">
      {Checked ? (
        <i className="text-primary">
          <FaCheckCircle />
        </i>
      ) : (
        <i>
          <FaRegCircle />
        </i>
      )}
    </div>
  );
};

export default CheckBoxCricle;
