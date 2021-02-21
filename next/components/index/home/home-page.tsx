import { Carousel } from "../../shared/carousel/carousel";
import { ProductList } from "../../shared/product/product-list";
import { Spinner } from "../../shared/utilities/spinner";
import { HomeBanner } from "./component/home-banner";
import { HomeFeature } from "./component/home-feature";
import { HomeFeedback } from './component/home-feedback';
import { HomeNews } from "./component/home-news";
import { HomeContext, HomeProvider, useHomeContext } from "./providers/home-provider";

export function HomePage() {

    const sliderImages =  [
        {
            image: "https://i.imgur.com/XMTJQSx.png"
        },
        {
            image: "https://i.imgur.com/jriMx2e.jpg"
        },
        {
            image: "https://i.imgur.com/ycOejfb.png"
        },
    ]

    return <>
        <HomeProvider>         
            <HomeContext.Consumer>
                {
                   ({ loadDone, feedbacks, posts, productGroups  }) => {
                        return !loadDone ? <Spinner/> : 
                        <>                                
                            <Carousel infinite autoPlay={3000} animationSpeed={1000}>
                                {sliderImages.map((slide, index) => (
                                    <img className="w-full h-full object-cover" key={slide.image} src={slide.image} alt="" />
                                ))}
                            </Carousel>
                            {
                                productGroups.map(productGroup =>
                                    <div className="main-container py-12" key={productGroup.title}>
                                        <ProductList title={productGroup.title} products={productGroup.products}/>
                                    </div>
                                )
                            }
                            <div className="main-container py-12">
                                <HomeFeedback feedbacks={feedbacks}/>
                            </div>
                            <div className="main-container py-12">
                                <HomeFeature/>
                            </div>
                            <div className="w-full py-8">
                                <img
                                    className="w-full"
                                    src="https://i.imgur.com/jriMx2e.jpg"
                                />
                            </div>        
                            <div className="main-container py-12">
                                <HomeBanner/>
                            </div>
                            <div className="main-container py-8">
                                <HomeNews posts={posts}/>
                            </div>  
                        </>
                   }
                }
            </HomeContext.Consumer>
        </HomeProvider>
    </>
}