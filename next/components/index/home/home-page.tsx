import { Carousel } from "../../shared/carousel/carousel";
import { ProductList } from "../../shared/product/product-list";
import { SectionHeader } from "./component/section-header";
import { NewsList } from './../../shared/news/news-list';
import { HomeFeature } from "./component/home-feature";
import { HomeBanner } from "./component/home-banner";
import { HomeFeedback } from './component/home-feedback';
import { HomeNews } from "./component/home-news";
export function HomePage() {

    const sliderImages =  [
        "https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141910721_420388555702107_6501062765822356905_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=7sMouzaypgYAX84T7oT&_nc_ht=scontent-sin6-3.xx&oh=ed4e5bdb35b5240951c2b4e49569d54e&oe=602FCB5F",
        "https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141222954_246218120278719_5997877537810110707_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=N5JqCqaZ5AkAX-OHW6Y&_nc_ht=scontent-sin6-3.xx&oh=9e53fac0abc201ab863fb42569c343b1&oe=60325062",
        "https://scontent-sin6-2.xx.fbcdn.net/v/t1.15752-9/141639150_1376730039331224_3415912069657551318_n.png?_nc_cat=108&ccb=2&_nc_sid=ae9488&_nc_ohc=Tbi6IjdbXgIAX-BksVK&_nc_ht=scontent-sin6-2.xx&oh=0263df91ee9e033e494b21a9b4670c5b&oe=602FD3D3",
    ]

    return <>
        <Carousel infinite autoPlay={3000} animationSpeed={1000}>
            {sliderImages.map((image, index) => (
                <img className="w-full h-full object-cover" key={index} src={image} alt="" />
            ))}
        </Carousel>
        <div className="main-container py-12">
            <ProductList type='best_seller' />
        </div>
        <div className="main-container py-12">
            <ProductList type='latest' />
        </div>
        <div className="main-container py-12">
            <ProductList type='exclusive' />
        </div>
        <div className="main-container py-12">
            <ProductList type='personalized' />
        </div>
        <div className="main-container py-12">
            <HomeFeedback/>
        </div>
        <div className="main-container py-12">
            <HomeFeature/>
        </div>
        <div className="w-full py-8">
            <img
                src="https://scontent-sin6-3.xx.fbcdn.net/v/t1.15752-9/141910721_420388555702107_6501062765822356905_n.png?_nc_cat=110&ccb=2&_nc_sid=ae9488&_nc_ohc=7sMouzaypgYAX84T7oT&_nc_ht=scontent-sin6-3.xx&oh=ed4e5bdb35b5240951c2b4e49569d54e&oe=602FCB5F"
            />
        </div>        
        <div className="main-container py-12">
            <HomeBanner/>
        </div>
        <div className="main-container py-8">
            <HomeNews/>
        </div>
    </>
}