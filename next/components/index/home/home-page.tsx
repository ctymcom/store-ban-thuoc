import LazyLoad from "react-lazyload";

import { Carousel } from "../../shared/carousel/carousel";
import { ProductList } from "../../shared/product/product-list";
import { Spinner } from "../../shared/utilities/spinner";
import { HomeBanner } from "./components/home-banner";
import { HomeFeature } from "./components/home-feature";
import { HomeFeedback } from "./components/home-feedback";
import { HomeNews } from "./components/home-news";
import { HomeContext, HomeProvider } from "./providers/home-provider";

export function HomePage() {
  return (
    <>
      <HomeProvider>
        <HomeContext.Consumer>
          {({ loadDone, feedbacks, posts, productGroups, banners1, banners2 }) => {
            return !loadDone ? (
              <Spinner />
            ) : (
              <>
                <Carousel infinite autoPlay={3000} animationSpeed={1000}>
                  {banners1.map((slide, index) => (
                    <a className="w-full h-full" key={slide.image} href={slide.link}>
                      <img className="w-full h-full object-cover" src={slide.image} alt="" />
                    </a>
                  ))}
                </Carousel>
                {productGroups.map((productGroup) => (
                  <div className="main-container py-12" key={productGroup.title}>
                    <ProductList title={productGroup.title} products={productGroup.products} />
                  </div>
                ))}
                <div className="main-container py-12">
                  <HomeFeedback feedbacks={feedbacks} />
                </div>
                <div className="main-container py-12">
                  <HomeFeature />
                </div>
                <div className="w-full py-8">
                  {banners2.map((banner) => (
                    <a className="w-full" key={banner.image}>
                      <LazyLoad>
                        <img className="w-full" src={banner.image} />
                      </LazyLoad>
                    </a>
                  ))}
                </div>
                <div className="main-container py-12">
                  <HomeBanner />
                </div>
                <div className="main-container py-8">
                  <HomeNews posts={posts} />
                </div>
              </>
            );
          }}
        </HomeContext.Consumer>
      </HomeProvider>
    </>
  );
}
