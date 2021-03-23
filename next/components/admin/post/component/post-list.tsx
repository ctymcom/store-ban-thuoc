import { NotFound } from "../../../shared/utilities/not-found";
import { Post } from "./../../../../lib/repo/post.repo";
import { PostCard } from "./post-card";

interface PropsType extends ReactProps {
  posts: Post[];
}

export function PostList(props: PropsType) {
  return (
    <>
      {!props.posts.length ? (
        <NotFound text="Không tìm thấy bài viết nào" />
      ) : (
        <div className="grid grid-cols-3 gap-6 py-2">
          {props.posts.map((post, index) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      )}
    </>
  );
}
