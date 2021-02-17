import { useRouter } from "next/router";
import { Post } from "../../../../lib/repo/post-repo";
import { Button } from "../../../shared/form/button";

type PostCardProps = {
  [x: string]: any;
  post: Post;
};
export function PostCard({ post, ...props }: PostCardProps) {
  const router = useRouter();
  const editPost = (post) => {
    router.push(`/admin/post/${post.slug}`, null, { shallow: true });
  };
  return (
    <div {...props} className="p-2 rounded bg-white flex flex-col justify-between">
      <div className="cursor-pointer">
        <div className="h-40">
          <img
            src={post.featureImage || "https://placekitten.com/600/300"}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="py-4 max-h-80">
          <h1 className="py-2 font-semibold">{post.title}</h1>
          <h3 className="py-2 text-sm font-semibold text-gray-400">
            Người viết: <span className="text-blue-500">Tac gia</span>
          </h3>
          <p className="text-sm text-gray-400"> {post.excerpt} </p>
        </div>
      </div>
      <div className="flex items-center justify-end px-2">
        {post.status == "PUBLIC" ? <Button>Gỡ bài</Button> : <Button>Đăng bài</Button>}
        <Button primary onClick={() => editPost(post)}>
          Chỉnh sửa
        </Button>
      </div>
    </div>
  );
}
