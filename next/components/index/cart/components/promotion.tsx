import { useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import PromotionListDialog from './promotion-list-dialog';
type PromotionProps = {
    [x: string]: any,
    onChanged?: (promotion: any) => void,
    PrUsing: { code: '', des: '' },
    listPromotionCode,
}

const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
export function Promotion({ onChanged = () => { }, PrUsing, listPromotionCode, ...props }: PromotionProps) {
    const [usePromotion, setUsePromotion] = useState(false);
    const [promotion, setPromotion] = useState<string>();
    const [showDialog, setShowDialog] = useState(false);

    const applyPromotion = () => {
        if (usePromotion && PrUsing) {
            setPromotion(null);
            onChanged(null);
            setUsePromotion(false);
        } else if (!!Promotion) {
            onChanged(Promotion);
            setUsePromotion(true);
        }
    }
    const choseCode =(code)=>{
        setPromotion(code);
        setShowDialog(false);
        onChanged(code);
        setUsePromotion(true);
    }
    
    return (<div>
        <div className="flex border-b-2 items-center pb-2">
            <i className="text-primary text-24 transform -rotate-135"><IoTicketOutline /></i>
            <p className="uppercase px-2"> Mã khuyến mãi</p>
        </div>
        <div className="py-3 h-24">
            {
                usePromotion && PrUsing ? (
                    <div>
                        <h4 className="text-xl text-primary font-semibold">
                            Mã ưu đãi {PrUsing.code}</h4>
                        <p>Giảm giá: {PrUsing.des}%</p>
                    </div>
                ) : (
                        <div>
                            <p className="cursor-pointer text-primary"
                                onClick={() => setShowDialog(true)}
                            >Xem danh sách mã khuyến mãi</p>
                            <input id="Input__Promotion"
                                className="block w-full border border-gray-300 rounded mt-2 px-2 py-2"
                                type="text"
                                placeholder="Nhập mã ưu đãi"
                                onChange={(e) => setPromotion(e.target.value)} value={promotion} />
                            <p className={PrUsing !== null && PrUsing.code === "" ? "block text-lg text-red-600" : "hidden"}>Mã khuyến mãi không tồn tại</p>
                        </div>
                    )
            }
        </div>
        <button onClick={applyPromotion} type="button"
            className={Promotion ? "btn font-normal btn-primary w-full text-20 h-12" : "text-20 h-12 btn btn-disabled w-full"}>
            {usePromotion && PrUsing ? "Hủy áp dụng" : "Áp dụng"}
        </button>
        <PromotionListDialog isOpen={showDialog} setShowDialog={setShowDialog} listPromotionCode={listPromotionCode} choseCode={choseCode}/>
    </div>)
}