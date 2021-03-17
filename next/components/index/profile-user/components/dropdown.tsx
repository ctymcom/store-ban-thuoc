import React from "react";
type PropsType = {
  [x: string]: any;
  name?: string;
  id?: string;
  defaultValue?: string;
  listOptions: any[];
  onChanged?: Function;
};
const Dropdown = (props: PropsType) => {
  return (
    <select
      className="btn-outline w-full h-10 text-16 px-0 pl-0.5 md:pl-2"
      name={props.name}
      defaultValue={props.defaultValue}
      id={props.id}
      onChange={(e) => props.onChanged(e.target.value)}
    >
      {props.listOptions.map((item, index) => {
        return (
          <option
            className={item === props.defaultValue ? "bg-primary-light" : ""}
            key={index}
            value={item.value}
          >
            {item}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
