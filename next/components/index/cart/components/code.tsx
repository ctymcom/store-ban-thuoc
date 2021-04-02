import React from "react";
import { useState } from "react";
import { Promotion } from "../../../../lib/repo/promotion.repo";
import { Dialog } from "../../../shared/utilities/dialog/dialog";
import { usePromotionContext } from "../providers/promotion-provider";
import { useCart } from "../../../../lib/providers/cart-provider";
type CodeProps = {
  [x: string]: any;
  item: Promotion;
};
const Code = (props: CodeProps) => {
  const { setSelectedPromotion } = usePromotionContext();
  const { setPromotion } = useCart();
  const sendCode = () => {
    setSelectedPromotion(props.item);
    setPromotion(props.item.code);
    props.choseCode(props.item.code);
  };
  const [showMore, setShowMore] = useState(false);
  const setShow = (e) => {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
    setShowMore(!showMore);
  };
  return (
    <>
      <div
        className="flex items-center justify-around shadow-md rounded-md m-2 border-2 border-white hover:border-primary hover:text-primary transition-all duration-300 ease-in-out"
        onClick={() => sendCode()}
      >
        {/* <div className="w-20 min-w-20 border-dashed border-r-2 p-2 h-20 min-h-20">
          <img src="/assets/img/logo.png" alt="logo" />
        </div> */}
        <div className="p-2 cursor-pointer">
          <h3 className="text-lg">{props.item.name}</h3>
          <p className="text-gray-400">{props.item.description}</p>
          {/* <p className="cursor-pointer text-primary w-16 whitespace-nowrap rounded-md hover:bg-info-light" onClick={(e)=>setShow(e)}>Điều kiện</p> */}
        </div>
      </div>

      <Dialog
        width="410px"
        isOpen={showMore}
        onClose={() => setShowMore(false)}
        key={props.item.code}
      >
        <Dialog.Body>
          <p className="m-2" onClick={() => setShowMore(false)} key={props.item.code}>
            {props.item.condition}
          </p>
        </Dialog.Body>
      </Dialog>
    </>
  );
};

export default Code;
