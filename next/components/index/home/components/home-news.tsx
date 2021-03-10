import { Post } from "../../../../lib/repo/post.repo";
import { SectionHeader } from "./section-header";
import { PostCard } from "../../../shared/post/post-card";
import Link from "next/link";
import { PostList } from "../../../shared/post/post-list";

interface PropsType extends ReactProps {
  posts: Post[];
}
export function HomeNews(props: PropsType) {
  return (
    <>
      <PostList title="Tin mới nhất" posts={props.posts} />
      {/* <SectionHeader text="Tin mới nhất" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
        {props.posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div> */}
      <div className="flex-center mt-5">
        <Link href="/posts">
          <a className="btn-outline rounded-full is-primary h-12 w-48">Xem tất cả</a>
        </Link>
      </div>
    </>
  );
}
