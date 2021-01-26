import { useState } from "react";
import { ProductDetailData } from "./product-detail-data";

export function ProductImage(props) {

    const [image, setImage] = useState(props.product.slide_img[0].img);
    const style = {
        border: '2px solid #42B54A'
    }
    return <>
        <div className="product__image">
            <img className="object-fill w-full h-80 rounded-md" src={image} alt="" key={props.index}/>
            <div className="list-slider-image w-full flex mt-4 overflow-y-scroll">
                {
                    props.product.slide_img.map((item, index) => {
                        return  <>
                                <img key={index} style={image == item.img?style:{}} className={`object-cover w-28 h-28 mr-4 mb-2 rounded-sm p-1 box-content ${image == item.img ? 'active:border-green-500 active:border-2' : ''}`} src={item.img} alt="" onClick={() => setImage(item.img)}/>
                                {/* <img className={`object-contant w-28 h-28 mr-4 mb-2 rounded-sm boder  ${image == item.img ? 'focus:border-success border-2' : ''}`} src={item.img} alt="" onClick={() => setImage(item.img)}/> */}
                        </>;
                    })
                }
            </div>
        </div>
    </>;
}
