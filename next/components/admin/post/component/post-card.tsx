import Link from "next/link";
import { useRouter } from "next/router";
import { Post } from "../../../../lib/repo/post.repo";
import { Button } from "../../../shared/form/button";
import { usePostListContext } from "../providers/post-list-provider";

type PostCardProps = {
  [x: string]: any;
  post: Post;
};
export function PostCard({ post, ...props }: PostCardProps) {

  const { togglePostStatus } = usePostListContext()

  return (
    <div {...props} className="p-3 rounded bg-white flex flex-col justify-between">
      <div className="image-wrapper ratio-16-9">
        <img
          src={post.featureImage || '/assets/img/default.png'}
          onError={(e)=>{(e.target as any).src="/assets/img/default.png"}}
        />
      </div>
      <h1 className="mt-3 text-gray-800 font-semibold">{post.title}</h1>
      <h3 className="text-sm font-semibold text-gray-600">
        Tác giả: <span className="text-primary">Thu Trinh</span>
      </h3>
      <p className="text-sm text-gray-700"> {post.excerpt} </p>
      <div className="flex items-center justify-end mt-auto">
        <Link href={'/admin/post/' + post.slug}>
          <a className="btn-gray btn-lg mr-2">Chỉnh sửa</a>
        </Link>
        {post.status == "PUBLIC" ? <button className="btn-outline is-primary btn-lg" onClick={ () => togglePostStatus(post) }>
          <span>Gỡ bài</span>
        </button> : <button className="btn-primary btn-lg" onClick={ () => togglePostStatus(post) }>
          <span>Đăng bài</span>
        </button>}
        
      </div>
    </div>
  );
}
