import { useState } from "react";

export function ProductImage(props) {

    const [image, setImage] = useState(props.product.slide_img[0].img);
    const style = {
        border: '2px solid #42B54A'
    }
    const aspect_ratio_169 = {
        padding: "56.25%"
    }
    return <>
        <div className={`"product__image + ${aspect_ratio_169} + relative block"`}>
            <img className="object-contain w-full h-full top-0 left-0 block rounded-md m-auto absolute" src={image} alt="" key={props.index}/>
            <div className="list-slider-image w-full flex mt-4 overflow-y-scroll">
                {
                    props.product.slide_img.map((item, index) => {
                        return  <>
                            <img key={index} 
                                 style={image == item.img?style:{}} 
                                 className={`object-cover w-28 h-28 mr-4 mb-2 rounded-sm p-1 box-content 
                                 ${image == item.img ? 'active:border-green-500 active:border-2 opacity-60 transition-opacity' : ''}`} 
                                 src={item.img} alt="" 
                                 onClick={() => setImage(item.img)}/>
                        </>;
                    })
                }
            </div>
        </div>
    </>;
}
