import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { useEffect } from 'react';

type PropsType = {
  [x: string]: any;
  inputClassName?: string
  quantity: number
  setQuantity: Function
};
export function ProductQuantity(props: PropsType) {

  const handleSetQuantity = (value) => {
    if (value < 0) props.setQuantity(0)
    else props.setQuantity(value)
  }

  let leftButtonStyle, rightButtonStyle, inputStyle
  let buttonStyle = `btn-default p-0 w-8 h-10 text-32 text-primary hover:text-primary-dark`

  return (
    <>      
      <div className="flex items-center">
        <button className={buttonStyle}
        onClick={() => handleSetQuantity(props.quantity - 1)}>
          <i><HiMinusCircle/></i>
        </button>
        <input className={"w-11 h-10 text-center text-lg " + props.inputClassName} 
        value={props.quantity} type="number" 
        onChange={e => handleSetQuantity(Number(e.target.value))}/>
        <button className={buttonStyle}
        onClick={() => handleSetQuantity(props.quantity + 1)}>
          <i><HiPlusCircle/></i>
        </button>
      </div>
    </>
  );
}
