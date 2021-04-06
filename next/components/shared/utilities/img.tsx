import { useState } from "react";
import LazyLoad from "react-lazyload";

const defaultImage = "/assets/img/default.png";
const defaultAvatar = "/assets/img/avatar.svg";

interface PropsType extends ReactProps {
  src?: string;
  alt?: string;
  avatar?: boolean;
  rounded?: boolean;
  ratio169?: boolean;
  percent?: number;
  once?: boolean;
}

export function Img({ src, alt = "", once = true, ...props }: PropsType) {
  const [image, setImage] = useState(src);
  const [error, setError] = useState(false);

  const onImageError = () => {
    if (error) return;
    if (props.avatar) setImage(defaultAvatar);
    else setImage(defaultImage);
    setError(true);
  };

  return (
    <LazyLoad className="w-full" once={once}>
      <div
        className={`image-wrapper ${props.avatar ? "circle" : ""} ${
          props.rounded ? "rounded" : ""
        } ${props.ratio169 ? "ratio-16-9" : ""} ${props.className || ""}`.trim()}
        style={{
          ...(props.style ? props.style : {}),
          ...(props.percent ? { paddingTop: props.percent + "%" } : {}),
        }}
      >
        <img
          src={image || (props.avatar ? defaultAvatar : defaultImage)}
          onError={onImageError}
          alt={alt}
        />
        {props.children}
      </div>
    </LazyLoad>
  );
}
