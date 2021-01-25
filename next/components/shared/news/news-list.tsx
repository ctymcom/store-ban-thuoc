import { image } from "faker";
import { NewsData } from "./data/news-data";
import { NewsCard } from "./news-card";

export function NewsList() {
    return <div className="grid grid-cols-4 gap-8 py-8">
        {NewsData.map((item, index) => {
            return (
                <NewsCard title={item.title} img={item.img} description={item.description} key={index} />
            );
        })}
    </div>
}