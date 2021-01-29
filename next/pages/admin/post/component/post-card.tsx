import { Post } from "../../../../lib/repo/post-repo";

type PostCardProps = {
  [x: string]: any;
  post: Post;
};
export function PostCard({ post, ...props }: PostCardProps) {
  return (
    <div {...props} className="p-2 rounded bg-white flex flex-col justify-between">
      <div className="cursor-pointer">
        <div className=" max-h-40">
          <img src={post.featureImage} alt="" className=" max-h-40" />
        </div>
        <div className="py-2 max-h-80">
          <h1 className="py-2 font-semibold">{post.title}</h1>
          <h3 className="py-2 text-sm font-semibold text-gray-400">
            Người viết: <span className="text-blue-500">Tac gia</span>
          </h3>
          <p className="text-sm text-gray-400"> {post.excerpt} </p>
        </div>
      </div>
      <div className="flex items-center justify-end py-2">
        <div className="px-4 py-2 cursor-pointer mr-2 bg-gray-200 text-gray-400 border-2 border-gray-200 text-center rounded font-semibold">
          Chỉnh sửa
        </div>
        {post.status == "PUBLIC" ? (
          <div className="px-4 py-2 cursor-pointer  border-2 border-primary-500  text-primary-500 text-center rounded font-semibold">
            Gỡ bài
          </div>
        ) : (
          <div className="px-4 py-2 cursor-pointer bg-primary-500 border-2 border-primary-500 text-white  text-center rounded font-semibold">
            Đăng bài
          </div>
        )}
      </div>
    </div>
  );
}
