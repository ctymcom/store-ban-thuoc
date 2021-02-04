import { useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
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
    return (<div>
        <div className="flex border-b-2 items-center pb-2">
            <i className="text-primary text-24 transform -rotate-135"><IoTicketOutline /></i>
            <p className="uppercase px-2"> Mã khuyến mãi</p>
        </div>
        <div className="py-3 h-24">
            {
                UsePromotion && PrUsing.code !== "" ? (
                    <div>
                        <h4 className="text-xl text-primary font-semibold">
                            Mã ưu đãi {PrUsing.code}</h4>
                        <p>Giảm giá: {PrUsing.des}%</p>
                    </div>
                ) : (
                        <div>
                            <p className="cursor-pointer text-primary">Xem danh sách mã khuyến mãi</p>
                            <input id="Input__Promotion"
                                className="block w-full border border-gray-300 rounded mt-2 px-2 py-2"
                                type="text"
                                placeholder="Nhập mã ưu đãi"
                                onChange={(e) => setPromotion(e.target.value)} />
                            <p className={PrUsing !== null && PrUsing.code === "" ? "block text-lg text-red-600" : "hidden"}>Mã khuyến mãi không tồn tại</p>
                        </div>
                    )
            }
        </div>
        <button onClick={applyPromotion} type="button"
            className={Promotion ? "btn font-normal btn-primary w-full" : "btn btn-disabled w-full"}>
            {UsePromotion && PrUsing.code !== "" ? "Hủy áp dụng" : "Áp dụng"}
        </button>
    </div>)
}