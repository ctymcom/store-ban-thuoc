import ReactCarousel, * as carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useState } from "react";
type CarouselProps = {
  [x: string]: any;
  value?: number;
};
export function Carousel({ value, ...props }: CarouselProps) {
  const [ActiveIndex, setActiveIndex] = useState(value);
  const onChangeIndex = (value) => {
    if (value == ActiveIndex) return;
    setActiveIndex(value);
  };
  return (
    <div className="relative">
      <ReactCarousel
        {...props}
        infinite
        value={ActiveIndex}
        onChange={onChangeIndex}
      ></ReactCarousel>
      <carousel.Dots
        className="absolute bottom-0 w-full bg-white bg-opacity-20"
        value={ActiveIndex}
        onChange={onChangeIndex}
        number={props.children.length}
      />
    </div>
  );
}
