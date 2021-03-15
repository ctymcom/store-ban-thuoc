import { parseISO, format } from "date-fns";
import Link from "next/link";
import { Post } from "../../../../lib/repo/post.repo";
import { usePostListContext } from "../providers/post-list-provider";

type PostCardProps = {
  [x: string]: any;
  post: Post;
};
export function PostCard({ post, ...props }: PostCardProps) {
  const { togglePostStatus, removePost } = usePostListContext();

  const onPostRemoved = () => {
    let res = confirm("Xoá bài viết này?");
    if (res) {
      removePost(post.id);
    }
  };
  return (
    <div {...props} className="p-3 rounded bg-white flex flex-col justify-between">
      <div className="image-wrapper ratio-16-9">
        <img
          src={post.featureImage || "/assets/img/default.png"}
          onError={(e) => {
            (e.target as any).src = "/assets/img/default.png";
          }}
        />
        {!!post.priority && (
          <div className="absolute right-0 top-3 p-1 px-3 rounded-l bg-accent text-white shadow-md">
            Ưu tiên: {post.priority}
          </div>
        )}
      </div>
      <div className="mt-3 text-gray-800 font-semibold">{post.title}</div>
      <div className="text-sm text-gray-700 font-semibold">
        Ngày tạo: {format(parseISO(post.createdAt), "dd-MM-yyyy HH:mm")}
      </div>
      <p className="text-sm text-gray-700"> {post.excerpt} </p>
      <div className="flex items-center mt-auto pt-1">
        <button className="btn-default hover-danger" onClick={onPostRemoved}>
          Xoá
        </button>
        <Link href={"/admin/post/" + post.id}>
          <a className="btn-gray btn-lg mr-2 ml-auto">Chỉnh sửa</a>
        </Link>
        {post.status == "PUBLIC" ? (
          <button className="btn-outline is-primary btn-lg" onClick={() => togglePostStatus(post)}>
            <span>Gỡ bài</span>
          </button>
        ) : (
          <button className="btn-primary btn-lg" onClick={() => togglePostStatus(post)}>
            <span>Đăng bài</span>
          </button>
        )}
      </div>
    </div>
  );
}
