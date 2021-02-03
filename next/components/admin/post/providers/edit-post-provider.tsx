import { createContext, useEffect, useRef, useState } from "react";
import { Post, PostRepository } from "../../../../lib/repo/post-repo";
import { useRouter } from "next/router";

export const EditPostContext = createContext<{
  [x: string]: any;
  post?: Post;
}>({});
type EditPostProviderProps = {
  [x: string]: any;
  postId?: string;
};
export function EditPostProvider({ children, postId, ...props }: EditPostProviderProps) {
  const isNewPost = !postId;
  const postRepo = new PostRepository();
  const [Post, setPost] = useState<Post>();
  const router = useRouter();
  const updatePost = () => {
    return postRepo
      .update({
        id: postId,
        data: {
          title: Post.title,
          content: Post.content,
          featureImage: Post.featureImage,
          slug: Post.slug,
          publishedAt: Post.publishedAt,
          tagIds: Post.tagIds,
          excerpt: Post.excerpt,
        },
      })
      .then((res) => {
        setPost(Post);
        alert("Đã đăng.");
      });
  };
  const createPost = () => {
    return postRepo.create({ data: Post }).then((res) => {
      router.push(`/admin/post/${res.slug}`);
      alert("Đã đăng.");
    });
  };
  const publish = () => {
    if (isNewPost) {
      createPost();
    } else {
      updatePost();
    }
  };
  useEffect(() => {
    if (!isNewPost) {
      postRepo.getOne({ id: postId }).then((res) => {
        setPost({ ...res });
      });
    } else {
      setPost({ title: "", content: "" } as Post);
    }
  }, []);

  return (
    <EditPostContext.Provider value={{ post: Post, updatePost, createPost, publish }}>
      {children}
    </EditPostContext.Provider>
  );
}
