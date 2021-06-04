import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useProductDetailsContext } from "../providers/product-details-provider";
import ReactImageMagnify from "react-image-magnify";
import useScreen from "./../../../../lib/hooks/useScreen";
import { Spinner } from "../../../shared/utilities/spinner";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { cloneDeep } from "lodash";

export function ProductImage(props) {
  const { product } = useProductDetailsContext();

  const [image, setImage] = useState<{
    imageId: string;
    image: string;
    imageS: string;
    imageM: string;
    imageL: string;
  }>(null);
  const [dimension, setDimension] = useState(0);
  const [imgs, setImgs] = useState(cloneDeep(product.images));
  const ref: MutableRefObject<HTMLImageElement> = useRef();
  useEffect(() => {
    if (product) {
      setImage({
        imageId: product.imageId,
        image: product.image,
        imageS: product.imageS,
        imageM: product.imageM,
        imageL: product.imageL,
      });
      let index = imgs.findIndex((item) => item.imageId === product.imageId);
      if (index !== -1) {
        let elementImage = document.getElementsByClassName("image-item")[index];
        if (elementImage) {
          elementImage.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
      }
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
  const screenSm = useScreen("sm");

  const handleChangeImage2 = (next: boolean) => {
    let index = imgs.findIndex((item) => item.imageId === image.imageId);
    if (index !== -1) {
      let nextIndex = -1;
      if (next) {
        if (index + 1 < imgs.length) {
          nextIndex = index + 1;
        } else {
          nextIndex = 0;
        }
      } else {
        if (index - 1 >= 0) {
          nextIndex = index - 1;
        } else {
          nextIndex = imgs.length - 1;
        }
      }
      if (nextIndex !== -1) {
        setImage(imgs[nextIndex]);
        let elementImage = document.getElementsByClassName("image-item")[nextIndex];
        elementImage.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  };
  const handleChangeImage = (
    img: {
      imageId: string;
      image: string;
      imageS: string;
      imageM: string;
      imageL: string;
    },
    index: number
  ) => {
    setImage(img);
    let elementImage = document.getElementsByClassName("image-item")[index];
    elementImage.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <>
      <img
        className="hidden"
        src={image?.imageL || "/assets/img/default.png"}
        ref={ref}
        onError={(e) => {
          (e.target as any).src = "/assets/img/default.png";
          let imgNew = {
            imageId: image.imageId,
            imageM: "/assets/img/default.png",
            imageL: "/assets/img/default.png",
            image: "/assets/img/default.png",
            imageS: "/assets/img/default.png",
          };
          let index = imgs.findIndex((item) => item.imageId === image.imageId);
          if (index) {
            let listNew = imgs;
            listNew.splice(index, 1);
            listNew.push(imgNew);
          }
          setImage(imgNew);
        }}
      />
      {(image && (
        <>
          <div style={{ minHeight: 250 }}>
            {dimension && (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "",
                    isFluidWidth: true,
                    src: image.imageM || "/assets/img/default.png",
                  },
                  largeImage: {
                    src: image.imageL || "/assets/img/default.png",
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
          </div>

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

          <div className="mt-4 h-36 relative group w-full border rounded-sm flex items-center">
            {imgs.length > 3 && screenSm && (
              <>
                <button
                  className={`focus:outline-none absolute  left-0 my-0 -top-1 bg-primary-light px-6 py-16 text-2xl text-primary transition-all duration-300 opacity-0 group-hover:opacity-80
              hover:opacity-100 hover:bg-primary hover:text-white`}
                  onClick={() => handleChangeImage2(false)}
                >
                  <FaArrowLeft />
                </button>
                <button
                  className={`focus:outline-none absolute  right-0 my-0 -top-1 bg-primary-light px-6 py-16 text-2xl text-primary transition-all duration-300 opacity-0 group-hover:opacity-80
              hover:opacity-100 hover:bg-primary hover:text-white`}
                  onClick={() => handleChangeImage2(true)}
                >
                  <FaArrowRight />
                </button>
              </>
            )}
            <div className="flex list-slider-image overflow-x-auto sm:overflow-x-hidden ">
              {imgs.map((item, index) => {
                return (
                  <img
                    key={index}
                    className={`image-item object-cover cursor-pointer mr-4 border-2 rounded-sm p-1 box-border w-32
                                ${image.imageId == item.imageId ? "border-primary" : ""}`}
                    src={item.imageS || "/assets/img/default.png"}
                    alt=""
                    onClick={() => handleChangeImage(item, index)}
                  />
                );
              })}
            </div>
          </div>
        </>
      )) || <Spinner />}
    </>
  );
}
