import { useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { PromotionContext, PromotionProvider } from "../providers/promotion-provider";
import PromotionListDialog from "./promotion-list-dialog";
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
  const [usePromotion, setUsePromotion] = useState(false);
  const [promotion, setPromotion] = useState<string>();
  const [showDialog, setShowDialog] = useState(false);

  // const applyPromotion = () => {
  //   if (usePromotion && PrUsing) {
  //     setPromotion(null);
  //     onChanged(null);
  //     setUsePromotion(false);
  //   } else if (!!Promotion) {
  //     onChanged(Promotion);
  //     setUsePromotion(true);
  //   }
  // };
  const choseCode = (code) => {
    setPromotion(code);
    setShowDialog(false);
    onChanged(code);
    setUsePromotion(true);
  };

  return (
    <PromotionProvider>
      <div className="my-5 border-b-2 sm:border-0">
        <div className="flex border-0 sm:border-b-2 items-center pb-2">
          <i className="text-primary hidden sm:block text-24 transform">
            <IoTicketOutline />
          </i>
          <p className="uppercase px-2 text-16 sm:text-20"> Mã khuyến mãi</p>
        </div>
        <PromotionContext.Consumer>
          {({ selectedPromotion, usePromotion, applyPromotion }) => {
            return (
              <div className="sm:py-3 h-36 flex-wrap sm:block items-center relative">
                {usePromotion && selectedPromotion ? (
                  <div className="my-4 w-full">
                    <h4 className="text-lg sm:text-xl text-primary font-semibold">
                      Mã ưu đãi {selectedPromotion.code}
                    </h4>
                    <p>Giảm giá: {selectedPromotion.description}%</p>
                  </div>
                ) : (
                  <>
                    <p
                      className="cursor-pointer text-primary text-16 sm:text-20"
                      onClick={() => setShowDialog(true)}
                    >
                      Xem danh sách mã khuyến mãi
                    </p>
                    {/* <div className="flex">
                      <input
                        className="form-input w-2/3 sm:my-4 sm:w-full rounded-r-none h-12 sm:rounded-md border-gray-200"
                        placeholder="Nhập mã ưu đãi"
                        onChange={(e) => {
                          setPromotion(e.target.value);
                        }}
                        value={promotion}
                        readOnly
                        disabled
                      />
                      <button
                        onClick={applyPromotion}
                        className={`sm:hidden font-normal sm:w-full text-16 sm:text-20 h-12 sm:my-2 ${
                          promotion ? "btn-primary" : "btn-disabled"
                        } ${PrUsing ? "w-full" : "w-1/3 rounded-l-none sm:rounded-md"}`}
                      >
                        {usePromotion && selectedPromotion ? "Hủy áp dụng" : "Áp dụng"}
                      </button>
                    </div> */}
                  </>
                )}
                <button
                  onClick={applyPromotion}
                  className={`font-normal w-full text-16 sm:text-20 h-12 sm:my-2 ${
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
