import { createContext, useEffect, useState } from "react";
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
    postRepo.update({ id: postId, data: Post }).then((res) => {
      setPost(Post);
    });
  };
  const createPost = () => {
    postRepo.create({ data: Post }).then((res) => {
      router.push(`/admin/post/${res.slug}`);
    });
  };
  useEffect(() => {
    if (!isNewPost) {
      postRepo.getOne({ id: postId }).then((res) => {
        setPost(res);
      });
    } else {
      setPost({ title: "", content: "" } as Post);
    }
  }, []);

  return (
    <EditPostContext.Provider value={{ Post, updatePost, createPost }}>
      {children}
    </EditPostContext.Provider>
  );
}
