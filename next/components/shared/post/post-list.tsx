import { SectionHeader } from "../../index/home/components/section-header";
import { Post } from "./../../../lib/repo/post.repo";
import Slider from "react-slick";
import { PostCard } from "./post-card";
import { useEffect, useRef, useState } from "react";
import useScreen from "./../../../lib/hooks/useScreen";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

interface PropsType extends ReactProps {
  posts: Post[];
  title: string;
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div>
      <div
        className={`z-10 text-2xl right-0 sm:-right-2 text-gray-500 hover:text-primary w-8 h-8 shadow-md rounded-full justify-center items-center ${
          className || ""
        }`}
        style={{ ...style, display: "flex", background: "white", border: "1px solid #eee" }}
        onClick={onClick}
      >
        <HiChevronRight className="absolute" />
      </div>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`z-10 text-2xl left-0 sm:-left-2 text-gray-500 hover:text-primary w-8 h-8 shadow-md rounded-full justify-center items-center ${
        className || ""
      }`}
      style={{ ...style, display: "flex", background: "white", border: "1px solid #eee" }}
      onClick={onClick}
    >
      <HiChevronLeft className="absolute" />
    </div>
  );
}

export function PostList(props: PropsType) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [settings, setSettings] = useState({
    infinite: true,
    dots: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setActiveIndex(current),
    appendDots: (dots) => <div className="flex mt-4">{dots}</div>,
    customPaging: (i) => (
      <div
        className={`w-2 h-2 ${
          activeIndex == i ? "bg-primary" : "bg-gray-300 hover:bg-gray-500"
        } rounded-full`}
      ></div>
    ),
  });
  const screenSm = useScreen("sm");
  const screenLg = useScreen("lg");

  useEffect(() => {
    if (screenLg) {
      setSettings({
        ...settings,
        slidesToShow: 4,
        slidesToScroll: 2,
      });
    } else {
      if (screenSm) {
        setSettings({
          ...settings,
          slidesToShow: 2,
          slidesToScroll: 2,
        });
      } else {
        setSettings({
          ...settings,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
      }
    }
  }, [screenLg, screenSm]);

  return (
    <>
      <SectionHeader text={props.title} />
      <Slider {...settings}>
        {props.posts.map((post) => (
          <div className="p-2" key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </Slider>
      {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 xs:gap-3 md:gap-5">
        {
          props.posts.map((post, index) => {
            return <PostCard key={post.id} post={post} />
          })
        }
      </div> */}
    </>
  );
}
