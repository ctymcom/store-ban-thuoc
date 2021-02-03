import { toNumber } from "lodash";
import { useState } from "react";


export function ProductInfo(props) {

    // const [amountProduct, setAmountProduct] = useState(1);

    
    return  <>
            <p className="product__type text-gray-400 mb-2 text-sm">{props.product.type}</p>
            <a href="#" className="product__name mb-2 block text-2xl">{props.product.name}</a>
            <div className="product__price mb-6">
                <span className="product__price-current text-primary mr-4 text-2xl">{props.product.sale_price}/hộp</span>
                <span  className="product__price-old text-gray-400 line-through text-base">{props.product.old_price}</span>
            </div>
            <p className="product__description mb-8 text-lg ">
                <span>{props.product.description_1}</span>
                <br/><br/>
                <span className="truncate w-full block">{props.product.description_2}</span>
            </p>
            <div className="form-input-text flex relative items-center w-32 h-10 mb-6">
                <button className="text-xl focus:outline-none hover:text-primary absolute left-0 ml-2"
                        onClick={() => { props.handleChangeAmount(props.product.id, "down", 0) }}>-</button>
                <input  type="number" name="numberProduct" id="numberProduct" className="product__number text-center w-full h-full flex justify-between items-center border-2 px-2 border-primary rounded placeholder-gray-700"
                        value={props.product.amount < 10 ? '0' + props.product.amount : (props.product.amount).toString() }
                        onChange={(event) => { props.handleChangeAmount(props.product.id, "i", toNumber(event.target.value)) }}/>
                        
                <button className="text-xl focus:outline-none hover:text-primary absolute right-0 mr-2"
                        onClick={() => { props.handleChangeAmount(props.product.id, "updown", 0) }}>+</button>
            </div>
           
            
            <div className="btn-group">
                <button className="bg-warning rounded text-white px-4 py-2 mr-6">Thêm vào giỏ</button>
                <button className="bg-primary rounded text-white px-4 py-2">Mua ngay</button>
            </div>
    </>;
}