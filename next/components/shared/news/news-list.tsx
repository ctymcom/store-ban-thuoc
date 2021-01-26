import { image } from "faker";
import { NewsData } from "./data/news-data";
import { NewsCard } from "./news-card";

export function NewsList() {
    return <div className="scrollbar flex relative overflow-auto md:overflow-hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 py-8">
        {NewsData.map((item, index) => {
            return (
                <NewsCard title={item.title} img={item.img} description={item.description} key={index} />
            );
        })}
    </div>
}