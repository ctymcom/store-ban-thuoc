import React, { useEffect } from "react";

import { usePromotionContext } from "../providers/promotion-provider";
import Code from "./code";

const ListCode = (props) => {
  const { listPromotion } = usePromotionContext();
  return (
    <div>
      {listPromotion.map((item, index) => {
        return (
          <div key={index} className="text-20">
            <Code item={item} index={index} choseCode={props.choseCode} />
          </div>
        );
      })}
    </div>
  );
};

export default ListCode;
