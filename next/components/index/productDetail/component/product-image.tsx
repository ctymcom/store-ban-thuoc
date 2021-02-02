import { useState } from "react";
import { times } from "lodash";

export function ProductImage(props) {

    const [image, setImage] = useState(props.product.slide_img[0].img);
    const style = {
        border: '2px solid #42B54A'
    }
    const aspect_ratio_169 = {
        paddingTop: "56.25%"
    }

    const handleChangeImage = (img, index) => {
        setImage(img);
        let elementImage = document.getElementsByClassName("image-item")[index];
        let elementSliderImage = document.querySelector(".list-slider-image");
        console.log(elementImage);
        elementImage.scrollIntoView();
        elementImage.scrollIntoView({block: "end"});
        elementImage.scrollIntoView({inline: "center"});
        elementImage.scrollIntoView({behavior: "smooth", block: "end"});
    }

    return <>
        <div className="product__image aspect-ratio-169 block relative" style={aspect_ratio_169}>
            <img className="object-contain rounded-md m-auto block absolute w-full h-full top-0 left-0" src={image} alt="" key={props.index}/>
            <div className="list-slider-image w-full flex mt-4 overflow-y-scroll absolute -bottom-40 left-0">
                {

                    props.product.slide_img.map((item, index) => {
                        return  <>
                            <img key={index} 
                                 style={image == item.img?style:{}} 
                                 className={`image-item object-cover w-28 h-28 mr-4 mb-2 rounded-sm p-1 box-content 
                                 ${image == item.img ? 'active:border-green-500 active:border-2 opacity-60 transition-opacity' : ''}`} 
                                 src={item.img} alt="" 
                                 onClick={() => handleChangeImage(item.img, index)}/>
                        </>;
                    })
                }
            </div>
        </div>
    </>;
}
