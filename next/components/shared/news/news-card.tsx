type NewsCardProps = {
    [x: string]: any;
    img: string;
    title: string;
    description: string;
    onClick?: () => void;
}
export function NewsCard({ img, title, description, ...props }: NewsCardProps) {
    return <div className="Product flex items-center flex-col cursor-pointer hover:shadow">
        <div className="img">
            <img src={img} alt="" className="w-full h-auto" />
        </div>
        <div className="px-4 py-3 h-16">
            <p className="text-center text-sm">{title}</p>
        </div>
        <div className="px-4 py-3">
            <p className="text-center text-xs text-gray-400">{description}</p>
        </div>
    </div>
}