import { ProductDetailData } from "./product-detail-data";


export function ProductInfo(props) {
    return  <>
            <p className="product__type text-gray-400 mb-2">{props.product.type}</p>
            <a href="#" className="product__name mb-2 block">{props.product.name}</a>
            <div className="product__price mb-6">
                <span className="product__price-current text-green-500 mr-4">{props.product.sale_price}/hộp</span>
                <span  className="product__price-old text-xs text-gray-400 line-through">{props.product.old_price}</span>
            </div>
            <p className="product__description mb-8">
                {props.product.description_1}
                <br/><br/>
                {props.product.description_2}
            </p>
            <p className="product__name w-32 h-10 flex justify-between items-center border px-2 border-success mb-6 rounded-sm">
                <img className="object-cover" src="../../../../../assets/images/-.png" alt=""/>
                    01
                <img className="object-cover" src="../../../../../assets/images/+.png" alt=""/>
            </p>
            <div className="btn-group">
                <button className="bg-btn-yellow text-white px-4 py-2 mr-6">Thêm vào giỏ</button>
                <button className="bg-btn-green text-white px-4 py-2">Thêm vào giỏ</button>
            </div>
    </>;
}