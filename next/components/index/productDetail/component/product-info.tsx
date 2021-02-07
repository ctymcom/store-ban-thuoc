import { toNumber } from "lodash";
import Link from "next/link";
import { useState } from "react";
import { HiMinusCircle, HiPlusCircle } from "react-icons/hi";
import { NumberPipe } from '../../../../lib/pipes/number';

export function ProductInfo(props) {
    const [quantity, setQuantity] = useState(0);

    const handleSetQuantity = (value) => {
        if (value < 0) setQuantity(0)
        else setQuantity(value)
    }
    return  <>
            <p className="product__type text-gray-400 mb-2 text-sm">{props.product.type}</p>
            <a href="#" className="product__name mb-2 block text-2xl">{props.product.name}</a>
            <div className="tag-type my-5">
                <span className="border border-primary px-4 py-1 rounded-full mr-4 hover:bg-primary hover:text-white cursor-pointer">Tăng giá</span>
                <span className="border border-primary px-4 py-1 rounded-full mr-4 hover:bg-primary hover:text-white cursor-pointer">Sản phẩm độc quyền</span>
                <span className="border border-primary px-4 py-1 rounded-full text-white bg-primary">Điểm tích lũy: 10đ</span>
            </div>
            <div className="product__price mb-6">
                <span className="product__price-current text-primary mr-4 text-2xl">{NumberPipe(props.product.sale_price)} VNĐ/hộp</span>
                <span  className="product__price-old text-gray-400 line-through text-base">{NumberPipe(props.product.old_price)}</span>
            </div>
            <div className="finish-time text-red-600 font-extrabold mb-4">Kết thúc sau: 63 : 45 : 32</div>
            <p className="product__description mb-12 text-lg">
                <span className="truncate w-full block">{props.product.description_1}</span>
            </p>
            <div className="number flex items-center mt-0 mb-8">
                <div className="text mr-8">
                    <div className="text-sm text-gray-500">Chọn số lượng</div>
                    <div className="text-sm text-gray-800">Hộp 12 vỉ x 60 viên</div>
                </div>
                <div className="button-group flex relative items-center w-32 h-10">
                    <button className="btn-default p-0 w-8 h-10 text-64 text-primary hover:text-primary-dark"
                        onClick={() => handleSetQuantity(quantity - 1)}>
                        <i><HiMinusCircle/></i>
                    </button>
                    <input className="w-11 h-12 text-center text-lg mx-5" value={quantity.toString()} type="number" 
                        onChange={e => handleSetQuantity(Number(e.target.value))}/>
                    <button className="btn-default p-0 w-8 h-10 text-64 text-primary hover:text-primary-dark"
                        onClick={() => handleSetQuantity(quantity + 1)}>
                        <i><HiPlusCircle/></i>
                    </button>
                </div>
            </div>
            <div className="btn-group flex">
                <div className="btn-add-to-cart">
                    <button className="bg-warning rounded-md text-white px-4 py-2.5 focus:outline-none">Thêm vào giỏ</button>  
                </div>
                <div className="btn-add-to-cart">
                    <Link href="/cart">
                        <button className="bg-primary rounded-md text-white px-4 py-2.5 focus:outline-none ml-8">Mua ngay</button>
                    </Link>
                </div>
            </div>
            <div className="tag-name mt-5">
                <span className="text-lg text-gray-800">Tag:</span>
                <span className="text-sm text-primary ml-2">Sản phẩm mới, Sản phẩm giảm giá, Sản phẩm độc quyền</span>
            </div>
    </>;
}