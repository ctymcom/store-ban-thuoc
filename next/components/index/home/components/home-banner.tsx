import { useHomeContext } from "./../providers/home-provider";
import LazyLoad from "react-lazyload";
export function HomeBanner() {
  const { banners3 } = useHomeContext();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {banners3.map((banner, index) => (
        
          <a className=""  href={banner.link}>
            <LazyLoad key={index} className="image-wrapper ratio-16-9"><img key={index} src={banner.image} alt="" /></LazyLoad>
          </a>
      ))}
    </div>
  );
}
