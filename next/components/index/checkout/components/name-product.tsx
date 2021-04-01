import React from "react";
import { useState } from "react";
interface Proptype extends ReactProps {
  name: string;
  fullName: string;
}

const NameProduct = (props: Proptype) => {
  const [showFullName, setShowFullName] = useState(false);
  return (
    <>
      <div
        className={`${props.className || ""} relative`}
        onMouseEnter={() => setShowFullName(true)}
        onMouseLeave={() => setShowFullName(false)}
      >
        <span className="whitespace-nowrap">{props.name}</span>
        {showFullName && (
          <div className="absolute emerge shadow-lg z-20 top-0 right-0 bg-gray-200 text-gray-700 px-2 font-semibold">
            {props.fullName}
          </div>
        )}
      </div>
    </>
  );
};

export default NameProduct;
