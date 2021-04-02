import { select } from "async";
import { createContext, useContext, useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { Promotion, PromotionService } from "../../../../lib/repo/promotion.repo";
import { useCart } from "../../../../lib/providers/cart-provider";
export const PromotionContext = createContext<{
  [x: string]: any;
  listPromotion?: Promotion[];
  selectedPromotion?: Promotion;
  setSelectedPromotion?: (item: Promotion) => void;
  applyPromotion?: () => void;
}>({});

export function PromotionProvider(props) {
  let [listPromotion, setListPromotion] = useState<Promotion[]>([]);
  let [selectedPromotion, setSelectedPromotion] = useState<Promotion>();

  const { setPromotion, promotion } = useCart();

  const applyPromotion = () => {
    if (selectedPromotion) {
      setPromotion(null);
      setSelectedPromotion(null);
    } else {
      setPromotion(selectedPromotion.code);
    }
  };

  useEffect(() => {
    PromotionService.getAll().then((res) => {
      setListPromotion(cloneDeep(res.data));
      if (promotion) {
        setSelectedPromotion(res.data.find((item) => item.code === promotion));
      }
    });
  }, []);
  return (
    <PromotionContext.Provider
      value={{
        listPromotion,
        setSelectedPromotion,
        selectedPromotion,
        applyPromotion,
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
}

export const usePromotionContext = () => useContext(PromotionContext);
