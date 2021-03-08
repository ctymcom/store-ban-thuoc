import { createContext, useContext, useEffect, useState } from "react";
import { Post, PostService } from "../../../../lib/repo/post.repo";
import { Tag, TagService } from "./../../../../lib/repo/tag.repo";
import { useRouter } from "next/router";
import { useToast } from "../../../../lib/providers/toast-provider";

export const PostDetailsContext = createContext<{
  post?: Post;
  savePost?: () => Promise<Post>;
  tags?: Tag[];
  createTag?: Function;
}>({});

export function PostDetailsProvider({ children }: any) {
  const router = useRouter();
  const postId = router.query["id"] as string;
  const [post, setPost] = useState<Post>(null);
  const [tags, setTags] = useState<Tag[]>([]);
  const toast = useToast();

  useEffect(() => {
    TagService.getAll({ query: { limit: 0 } }).then((res) => {
      setTags(res.data);
    });
  }, []);

  useEffect(() => {
    if (postId) {
      PostService.getOne({ id: postId }).then((res) => {
        setPost(JSON.parse(JSON.stringify(res)));
      });
    } else {
      setPost({
        title: "",
        excerpt: "",
        content: "",
        featureImage: "",
        slug: "",
        priority: null,
        tags: [],
        tagIds: [],
        publishedAt: new Date(),
      });
    }
  }, [postId]);

  const createTag = (name: string) => {
    return TagService.create({ data: { name } }).then((res) => {
      setTags([...tags, res]);
      post.tagIds = [...post.tagIds, res.id];
      return res;
    });
  };

  const savePost = (): Promise<Post> => {
    let { title, content, slug, publishedAt, excerpt, tagIds, featureImage, priority } = post;
    if (!title || !slug || !content) {
      toast.warn("Yêu cầu nhập đầy đủ tiêu đề, nội dung và đường dẫn.");
      return;
    }
    return PostService.createOrUpdate({
      id: post.id,
      data: { title, content, slug, publishedAt, excerpt, tagIds, featureImage, priority },
    });
  };

  return (
    <PostDetailsContext.Provider value={{ post, savePost, tags, createTag }}>
      {children}
    </PostDetailsContext.Provider>
  );
}

export const usePostDetailsContext = () => useContext(PostDetailsContext);
