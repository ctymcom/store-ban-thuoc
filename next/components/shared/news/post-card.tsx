import { isSameYear, format, parseISO } from 'date-fns'
import { Post } from '../../../lib/repo/post.repo';
interface PropsType extends ReactProps {
    post: Post
}
export function PostCard(props: PropsType) {

    let date = parseISO(props.post.createdAt.toString())
    let dateText, dateSubtext
    if (isSameYear(date, new Date())) {
        dateText = format(date, 'dd')
        dateSubtext = 'Th' + format(date, 'MM')
    } else {
        dateText = format(date, 'dd') + ' Th' + format(date, 'MM')
        dateSubtext = format(date, 'yyyy')
    }

    return <div className="flex flex-col cursor-pointer rounded hover:shadow-md transition group overflow-hidden">
        <div className="w-full">
            <div className="image-wrapper ratio-16-9">
                <img src={props.post.featureImage} onError={(e)=>{(e.target as any).src="/assets/img/default.png"}}/>
                <div className="border border-primary bg-white absolute top-3 left-3 flex flex-col items-center px-2 py-2">
                    <div className="text-gray-700 text-sm font-bold">{dateText}</div>
                    <div className="text-gray-600 text-sm font-semibold">{dateSubtext}</div>
                </div>
            </div>
        </div>
        <div className="px-4 pt-4 pb-3 text-lg text-gray-800 font-semibold group-hover:text-primary-dark">
            {props.post.title}
        </div>
        <div className="px-4 mb-4 text text-gray-600 group-hover:text-primary text-ellipsis-3 h-18 font-normal">
            {props.post.excerpt}
        </div>
    </div>
}