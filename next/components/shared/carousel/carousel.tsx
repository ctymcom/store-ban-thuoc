import ReactCarousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useState } from "react";
interface PropsType extends ReactProps {
  [x: string]: any
};
export function Carousel({ ...props }: PropsType) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onChangeIndex = (value) => {
    if (value == activeIndex) return;
    setActiveIndex(value);
  };
  return (
    <div className="relative">
      <ReactCarousel
        {...props}
        value={activeIndex}
        onChange={onChangeIndex}
      ></ReactCarousel>
      <Dots
        className="absolute bottom-0 w-full"
        value={activeIndex}
        onChange={onChangeIndex}
        number={props.children.length}
      />
    </div>
  );
}
