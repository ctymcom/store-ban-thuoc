import { useState } from "react";
import { IconPromotion } from '../../../../lib/svg/icon-promotion';
type PromotionProps = {
    [x: string]: any,
    onChanged?: (promotion: any) => void,
    PrUsing: { code: '', des: '' }
}
export function Promotion({ onChanged = () => { }, PrUsing, ...props }: PromotionProps) {
    const [UsePromotion, setUsePromotion] = useState(false);
    const [Promotion, setPromotion] = useState<string>();
    const [Success, setSuccess] = useState(true);

    const applyPromotion = () => {
        if (UsePromotion && PrUsing.code !== "") {
            setPromotion(null);
            onChanged(null);
            setUsePromotion(false);
        } else if (!!Promotion) {
            onChanged(Promotion);
            setUsePromotion(true);
        }
    }
    return (<>
        <div className="flex border-b-4 pb-2 mt-2.5 items-center">
            <IconPromotion />
            <p className="uppercase px-2">Mã khuyến mãi</p>
        </div>
        <div className="py-4 w-full h-28">
            {
                UsePromotion && PrUsing.code !== "" ? (
                    <div>
                        <h4 className="text-xl text-primary font-semibold">
                            Mã ưu đãi {PrUsing.code}</h4>
                        <p>Giảm giá: {PrUsing.des}%</p>
                    </div>
                ) : (
                        <div>
                            <input id="Input__Promotion"
                                className="block w-full border-2 border-gray-300 rounded my-3 px-2 py-1"
                                type="text"
                                placeholder="Nhập mã ưu đãi"
                                onChange={(e) => setPromotion(e.target.value)} />
                            <p className={PrUsing !== null && PrUsing.code === "" ? "block text-lg text-red-600" : "hidden"}>Mã khuyến mãi không tồn tại</p>
                        </div>
                    )
            }
        </div>
        <button onClick={applyPromotion} type="button"
            className={Promotion ? "border-2 border-gray-300 rounded text-white bg-primary w-full py-1 px-2 text-center" : "border-2 border-gray-300 rounded bg-gray-200 w-full text-gray-400 py-1 px-2 text-center disabled"}>
            {UsePromotion && PrUsing.code !== "" ? "Hủy áp dụng" : "Áp dụng"}
        </button>
    </>)
}