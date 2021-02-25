import { useState } from "react";

export function ProductImage(props) {

    const [image, setImage] = useState(props.product.slide_img[0].img);
    const style = {
        border: '2px solid #42B54A'
    }

    const handleChangeImage = (img, index) => {
        setImage(img);
        let elementImage = document.getElementsByClassName("image-item")[index];
        elementImage.scrollIntoView({behavior: "smooth", block: "nearest", inline: "center"});
    }
    const aspect_ratio_169 = {
        paddingTop: "56.25%",
    };

    return <>
        <div className="block w-full h-full">
            <div className="aspect_ratio_169 block relative " style={aspect_ratio_169}>
                <div className="new-tag absolute ml-3 z-10 text-lg">Mới</div>
                <img className="object-contain rounded-md m-auto block absolute w-full h-full top-0 left-0 "  src={image} alt="" key={props.index}/>
                <div className="sale-tag flex-center absolute right-6 top-2 text-white font-semibold">
                    <img className="w-16" src="/assets/svg/sale.svg"/>
                    <span className="absolute text-xl">-50%</span>
                </div>
            </div>
            <div className="w-full flex mt-4 overflow-y-scroll h-36 ">
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
            </div>
        </div>
    </>;
}
