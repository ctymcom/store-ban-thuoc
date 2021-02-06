import { createContext, useEffect, useRef, useState } from "react";
import { Post, PostRepository } from "../../../../lib/repo/post-repo";
import { useRouter } from "next/router";
import { Tag, TagRepository } from "../../../../lib/repo/tag-repo";

export const EditPostContext = createContext<{
  [x: string]: any;
  post?: Post;
  tags?: Tag[];
  loadTags?: (search?: string) => Promise<Tag[]>
  createTag?: (name: string) => Promise<Tag>
}>({});
type EditPostProviderProps = {
  [x: string]: any;
  postId?: string;
};
export function EditPostProvider({ children, postId, ...props }: EditPostProviderProps) {
  const isNewPost = !postId;
  const postRepo = new PostRepository();
  const tagRepo = new TagRepository();
  const [Post, setPost] = useState<Post>();
  const [Tags, setTags] = useState<Tag[]>();
  const router = useRouter();
  const loadTags = (search?: string) => {
    return tagRepo.getAll({ query: { limit: 100, search } }).then((res) => {
      setTags(res.data);
      return res.data;
    });
  };
  const createTag = (name: string) => {
    return tagRepo.create({ data: { name }}).then(res => {
      setTags([...Tags, res]);
      return res;
    })
  }
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
    loadTags();
    if (!isNewPost) {
      postRepo.getOne({ id: postId }).then((res) => {
        setPost({ ...res });
      });
    } else {
      setPost({ title: "", content: "" } as Post);
    }
  }, []);

  return (
    <EditPostContext.Provider value={{ post: Post, tags: Tags, updatePost, createPost, publish, loadTags, createTag }}>
      {children}
    </EditPostContext.Provider>
  );
}
