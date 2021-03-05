import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useProductDetailsContext } from "../providers/product-details-provider";
import ReactImageMagnify from "react-image-magnify";
import useScreen from "./../../../../lib/hooks/useScreen";

export function ProductImage(props) {
  const { product } = useProductDetailsContext();

  const [image, setImage] = useState("");
  const [dimension, setDimension] = useState(0);
  const ref: MutableRefObject<HTMLImageElement> = useRef();

  useEffect(() => {
    if (product) {
      setImage(product.imageM || "/assets/img/default.png");
    }
  }, [product]);

  useEffect(() => {
    if (ref.current.width && ref.current.height) {
      setDimension(ref.current.width / ref.current.height);
    } else {
      setDimension(1);
    }
  }, [ref.current]);

  const screenMd = useScreen("md");

  const handleChangeImage = (img, index) => {
    setImage(img);
    let elementImage = document.getElementsByClassName("image-item")[index];
    elementImage.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <img
        className="hidden"
        src={image}
        ref={ref}
        onError={(e) => {
          setImage("/assets/img/default.png");
        }}
      />
      {dimension && (
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "",
              isFluidWidth: true,
              src: image,
            },
            largeImage: {
              src: product.imageL,
              width: 1200,
              height: 1200 / dimension,
            },
            enlargedImagePosition: screenMd ? "beside" : "over",
            className: "border border-gray-200 rounded",
            enlargedImageContainerClassName: "bg-white z-20 border border-gray-200",
            enlargedImageClassName: "max-w-none",
          }}
        />
      )}
      {/* <div className="image-wrapper rounded ratio-16-9 contain">
            <img src={image || "/assets/img/default.png"}
                onError={(e)=>{(e.target as any).src="/assets/img/default.png"}}
            />
            <div className="new-tag absolute z-10 text-lg">Mới</div> *
            {
                !!product.saleRate && 
                <div className="flex-center absolute right-6 top-2 text-white font-semibold">
                    <img className="w-16" src="/assets/img/sale.svg"/>
                    <span className="absolute text-xl">-{product.saleRate}%</span>
                </div>
            }
        </div> */}
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
    </>
  );
}
