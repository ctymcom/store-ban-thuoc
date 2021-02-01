import { useState } from "react";


export function ProductInfo(props) {

    const [NumberProduct, setNumberProduct] = useState(1);

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
            <p className="product__name w-32 h-10 flex justify-between items-center border-2 px-2 border-primary mb-6 rounded-sm">
                <button className="minus text-xl focus:outline-none hover:text-primary"
                        onClick={() => (NumberProduct <= 0) ? NumberProduct == 0 : setNumberProduct(NumberProduct - 1)}>-</button>
                    { NumberProduct }
                <button className="plus text-xl focus:outline-none hover:text-primary"
                        onClick={() => setNumberProduct(NumberProduct + 1)}>+</button>

            </p>
            <div className="btn-group">
                <button className="bg-primary text-white px-4 py-2 mr-6">Thêm vào giỏ</button>
                <button className="bg-warning text-white px-4 py-2">Mua ngay</button>
            </div>
    </>;
}