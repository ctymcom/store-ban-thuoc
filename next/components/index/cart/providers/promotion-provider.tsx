import { select } from "async";
import { createContext, useContext, useEffect, useState } from "react";
import { cloneDeep } from "lodash";
import { Promotion, PromotionService } from "../../../../lib/repo/promotion.repo";
export const PromotionContext = createContext<{
  [x: string]: any;
  listPromotion?: Promotion[];
  selectedPromotion?: Promotion;
  usePromotion?: boolean;
  setSelectedPromotion?: (item: Promotion) => void;
  applyPromotion?: () => void;
}>({});

export function PromotionProvider(props) {
  let [listPromotion, setListPromotion] = useState<Promotion[]>([]);
  let [selectedPromotion, setSelectedPromotion] = useState<Promotion>();
  let [usePromotion, setUsePromotion] = useState(false);

  const applyPromotion = () => {
    if (usePromotion && selectedPromotion) {
      setSelectedPromotion(null);
      setUsePromotion(false);
    } else {
      setUsePromotion(true);
    }
  };

  useEffect(() => {
    PromotionService.getAll().then((res) => {
      setListPromotion(cloneDeep(res.data));
    });
  }, []);
  useEffect(() => {
    if (selectedPromotion) applyPromotion();
  }, [selectedPromotion]);
  return (
    <PromotionContext.Provider
      value={{
        listPromotion,
        setSelectedPromotion,
        selectedPromotion,
        usePromotion,
        applyPromotion,
      }}
    >
      {props.children}
    </PromotionContext.Provider>
  );
}

export const usePromotionContext = () => useContext(PromotionContext);
