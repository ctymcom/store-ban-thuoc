import { useState } from "react";
import { HiOutlineTicket } from "react-icons/hi";
import { PromotionContext, PromotionProvider } from "../providers/promotion-provider";
import PromotionListDialog from "./promotion-list-dialog";
import { from } from "rxjs";
type PromotionProps = {
  [x: string]: any;
};

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
export function Promotion({
  onChanged = () => {},
  PrUsing,
  listPromotionCode,
  ...props
}: PromotionProps) {
  const [promotion, setPromotion] = useState<string>();
  const [showDialog, setShowDialog] = useState(false);

  const choseCode = (code) => {
    setPromotion(code);
    setShowDialog(false);
    onChanged(code);
  };

  return (
    <PromotionProvider>
      <div className="my-5 border-b-2 sm:border-0">
        <div className="flex border-b-2 items-center pb-2">
          <i className="text-primary text-20 sm:text-24">
            <HiOutlineTicket />
          </i>
          <p className="uppercase px-2 text-16 "> Mã khuyến mãi</p>
        </div>
        <PromotionContext.Consumer>
          {({ selectedPromotion, usePromotion, applyPromotion }) => {
            return (
              <div className="sm:py-3 flex-wrap sm:block items-center relative">
                {usePromotion && selectedPromotion ? (
                  <div className="w-full">
                    <h4 className="text-lg sm:text-xl text-primary font-semibold">
                      Mã ưu đãi {selectedPromotion.code}
                    </h4>
                    <p className="text-16 ">Chi tiết: {selectedPromotion.description}</p>
                  </div>
                ) : (
                  <>
                    <p
                      className="cursor-pointer text-primary text-16 "
                      onClick={() => setShowDialog(true)}
                    >
                      Xem danh sách mã khuyến mãi
                    </p>
                  </>
                )}
                <button
                  onClick={applyPromotion}
                  className={`font-normal w-full text-16  h-12 sm:my-2 ${
                    promotion ? "btn-primary" : "btn-disabled"
                  } ${!selectedPromotion ? "hidden" : "block "}`}
                >
                  Hủy áp dụng
                </button>
              </div>
            );
          }}
        </PromotionContext.Consumer>

        <PromotionListDialog
          isOpen={showDialog}
          setShowDialog={setShowDialog}
          listPromotionCode={listPromotionCode}
          choseCode={choseCode}
        />
      </div>
    </PromotionProvider>
  );
}
