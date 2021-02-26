import { useEffect, useState } from "react";
import { useProductDetailsContext } from "../providers/product-details-provider";

export function ProductImage(props) {

    const { product } = useProductDetailsContext()

    const [image, setImage] = useState('');

    useEffect(() => {
        if (product) {
            setImage(product.image)
        }
    }, [product]);

    const handleChangeImage = (img, index) => {
        setImage(img);
        let elementImage = document.getElementsByClassName("image-item")[index];
        elementImage.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
    }

    return <>
        <div className="image-wrapper rounded ratio-16-9 contain">
            <img src={image || "/assets/img/default.png"}
                onError={(e)=>{(e.target as any).src="/assets/img/default.png"}}
            />
            {/* <div className="new-tag absolute z-10 text-lg">Mới</div> */}
            {
                !!product.saleRate && 
                <div className="flex-center absolute right-6 top-2 text-white font-semibold">
                    <img className="w-16" src="/assets/img/sale.svg"/>
                    <span className="absolute text-xl">-{product.saleRate}%</span>
                </div>
            }
        </div>
        {/* <div className="list-slider-image w-full flex mt-4 overflow-y-scroll h-36 ">
                {
                    props.product.slide_img.map((item, index) => {
                        return  <>
                                <img key={index} 
                                    style={image == item.img?style:{}} 
                                    className={`image-item object-cover mr-4 mb-2 rounded-sm p-1 box-border w-32
                                    ${image == item.img ? 'active:border-green-500 active:border-2 opacity-60 transition-opacity' : ''}`} 
                                    src={item.img} alt="" 
                                    onClick={() => handleChangeImage(item.img, index)}/> 
                        </>;
                    })
                }
        </div> */}
    </>;
}
