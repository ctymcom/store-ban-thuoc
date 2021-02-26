import { Post } from '../../../../lib/repo/post.repo';
import { SectionHeader } from "./section-header";
import { PostCard } from '../../../shared/news/post-card';

interface PropsType extends ReactProps {
  posts: Post[]
}
export function HomeNews(props: PropsType) {

  return (
    <>
      <SectionHeader text="Tin mới nhất" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {
          props.posts.map((post, index) => 
            <PostCard key={index} post={post}/>
          )
        }
      </div>
      <div className="flex-center mt-4">
        <button className="btn-outline rounded-full is-primary h-12 w-48">
          Xem tất cả
        </button>
      </div>
    </>
  )
}