import { useHomeContext } from "./../providers/home-provider";
import LazyLoad from "react-lazyload";
export function HomeBanner() {
  const { banners3 } = useHomeContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {banners3.map((banner, index) => (
        <LazyLoad>
          <a className="image-wrapper ratio-16-9" key={index} href={banner.link}>
            <img key={index} src={banner.image} alt="" />
          </a>
        </LazyLoad>
      ))}
    </div>
  );
}
